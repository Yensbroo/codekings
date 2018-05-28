const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const auth = require('../../config/passport')();
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
router.post("/facebook", authController.facebook_login);
// router.post(
//   "/user",
//   auth.authenticateJwt(),
//   authController.update_user
// );

//profile
router.get(
  "/profile",
  auth.authenticateJwt(),
  profileController.get_current_profile
);

router.delete(
  "/profile",
  auth.authenticateJwt(),
  profileController.delete_current_profile
);

router.get("/profile/all", profileController.get_all_profiles);
router.get("/profile/:handle", profileController.get_profile);
router.get("/profile/user/:user_id", profileController.get_profile_by_id);

router.post(
  "/profile",
  auth.authenticateJwt(),
  profileController.create_or_update_profile
);
//posts

router.get("/posts", postController.get_posts);
router.get("/post/:id", postController.get_post_by_id);

router.post(
  "/posts",
  auth.authenticateJwt(),
  postController.create_post
);

router.delete(
  "/post/:id",
  auth.authenticateJwt(),
  postController.delete_post
);

router.post(
  "/post/like/:id",
  auth.authenticateJwt(),
  postController.like_post
);

router.delete(
  "/post/unlike/:id",
  auth.authenticateJwt(),
  postController.unlike_post
);

router.post(
  "/post/comment/:id",
  auth.authenticateJwt(),
  postController.make_comment
);

router.delete(
  "/post/comment/:id/:comment_id",
  auth.authenticateJwt(),
  postController.delete_comment
);

/**
 * Categories
 */

router.get('/categories', categoryController.get_categories);
router.post('/categories', categoryController.create_category);



module.exports = router;
