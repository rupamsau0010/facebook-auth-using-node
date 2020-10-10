const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middlewares/authMiddlewares");
const authController = require("../controllers/authControllers");

// router.get('/auth/facebook',
//   passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });

router.get("/auth/facebook", passport.authenticate("facebook", { scope: "email, public_profile"}), authController.authFacebook_get);
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), authController.authFacebookCallback_get);
router.get("/", authController.home_get);
router.get("/secret", requireAuth, authController.secret_get);  // Using requireAuth Middleware function...
router.get("/currect_user", requireAuth, authController.current_user_get); // Using requireAuth Middleware function...
router.get("/logout", authController.logout_get);

module.exports = router;