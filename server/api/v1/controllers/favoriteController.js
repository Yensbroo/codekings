const Favorite = require('../models/Favorite');
const User = require('../models/User');
const Post = require('../models/Post');
const errorHandler = require('../utilities/errorHandler');

exports.get_favorites = (req, res, next) => {
  Favorite.find({user: req.user.id})
        .populate('post', ['title', 'name', 'user', 'category', 'likes'])
        .then(favorites => res.json(favorites))
        .catch(err => 
          res.status(404).json({nofavorites: 'No favorites found'})
        )
}

exports.add_favorite = (req, res, next) => {
  Favorite.findOne({post: req.body.postId})
          .then(favorite => {
            if(favorite) {
              return res.status(400).json({alreadyFavorite: 'This post is already favorited'})
            }

            const newFavorite = new Favorite({
              post: req.body.postId,
              user: req.user.id
            })

            newFavorite.save().then(favorite => res.json(favorite))
                             
          })
          .catch(err => res.status(404).json({nofavoritefound: 'No favorite found'}));
}

exports.remove_favorite = (req, res) => {
  Favorite.findOne({post: req.body.postId})
          .then(favorite => {
            if(favorite.user.toString() !== req.user.id) {
              return res
            .status(401)
            .json({ notauthorized: "You are not authorized" });
            }

            favorite.remove().then(() => {
              res.json({succes: true});
            })
          })
}
