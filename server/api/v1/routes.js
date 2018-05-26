const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
//const acl = require('../../config/authorization').getAcl();
require("../../config/passport")(passport);
/**
 * Controllers
 */
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const postController = require("./controllers/postController");
const categoryController = require('./controllers/categoryController');
/**
 * routes
 */

// Users
router.post("/signup", authController.user_create);
router.post("/login", authController.user_login);
router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.update_user
);

//profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.get_current_profile
);

router.delete(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.delete_current_profile
);

router.get("/profile/all", profileController.get_all_profiles);
router.get("/profile/:handle", profileController.get_profile);
router.get("/profile/user/:user_id", profileController.get_profile_by_id);

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.create_or_update_profile
);
//posts

router.get("/posts", postController.get_posts);
router.get("/post/:id", postController.get_post_by_id);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.create_post
);

router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  postController.delete_post
);

router.post(
  "/post/like/:id",
  passport.authenticate("jwt", { session: false }),
  postController.like_post
);

router.delete(
  "/post/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  postController.unlike_post
);

router.post(
  "/post/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postController.make_comment
);

router.delete(
  "/post/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postController.delete_comment
);

/**
 * Categories
 */

router.get('/categories', categoryController.get_categories);
router.post('/categories', categoryController.create_category);



module.exports = router;
