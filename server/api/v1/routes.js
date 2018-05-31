const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const auth = require('../../config/passport')();
const multer = require('multer');
const upload = require('./utilities/multerMiddleware');

/**
 * Controllers
 */
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const postController = require("./controllers/postController");
const categoryController = require('./controllers/categoryController');
const favoriteController = require('./controllers/favoriteController');
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
router.post(
  "/user/avatar",
  upload,
  passport.authenticate("jwt", { session: false }),
  authController.update_avatar
);
router.post("/facebook", authController.facebook_login);


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
router.get("/posts/user", passport.authenticate('jwt', {session: false}), postController.get_posts_by_user  )

router.post(
  "/posts", upload,
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

/**
 * Favorites
 */
router.get('/favorites', passport.authenticate('jwt', {session: false}), favoriteController.get_favorites);
router.post('/favorites', passport.authenticate('jwt', {session: false}), favoriteController.add_favorite);
router.delete('/favorites', passport.authenticate('jwt', {session: false}), favoriteController.remove_favorite);


module.exports = router;
