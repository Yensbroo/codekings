const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePostInput = require("../validation/post");
const validateCommentInput = require("../validation/comment");
const errorHandler = require('../utilities/errorHandler');
const algoliasearch = require('algoliasearch');
const applicationId = require('../../../config/keys').algolia.applicationId;
const apiKey = require('../../../config/keys').algolia.apiKey;
const client = algoliasearch(applicationId, apiKey);
const tutorialsIndex = client.initIndex('tutorials');

exports.get_posts = (req, res, next) => {
    const query = Post.find();
    query.sort( { created_at: -1 } );
    query.populate('category', 'name');
    query.exec((err, posts) => {
      if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving posts', next);
      if (!posts) {
        return errorHandler.handleAPIError(404, `Posts not found`, next);
      }
      return res.json(posts);
  });
};

exports.get_post_by_id = (req, res) => {
  Post.findById(req.params.id)
    .populate('category', 'name')
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post found with that ID" })
    );
};

exports.get_posts_by_user = (req, res) => {
  Post.find({user: req.user._id})
    .then(posts => res.json(posts))
    .catch(err => 
      res.status(404).json({nopostsfound: "You have no posts yet"})
    )
}


exports.create_post = (req, res, next) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    name: req.body.name,
    avatar: req.body.avatar,
    category: req.body.category,
    user: req.user.id,
  });
  console.log(newPost)
  newPost.save((err, post) => {
    if(err) return errorHandler.handleAPIError(500, 'Could not save the new post', next);
    Post.findOneAndUpdate({
      _id: post._id
    }, {
      $set: {
        tutorialId: post._id
      }
    }, {
      new: true
    }
  ).then(post => {
    tutorialsIndex.addObject(post, (err, content) => {
      if(err) console.log(err);
    });
    res.json(post)});
  });
};

exports.delete_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "You are not authorized" });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
};

exports.like_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
};

exports.unlike_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not yet liked this post" });
        }

        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
};

exports.make_comment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No Post found" }));
};

exports.delete_comment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: "Comment does not exist" });
      }

      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No Post found" }));
};
