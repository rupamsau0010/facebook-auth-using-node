// Require depandencies...
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const express = require("express");
const User = require("../models/User");

const app = express();

module.exports = function (passport, req, res) {
  // Use of SerializerUser and DeserializerUser...
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // Creating the new user docs in json format...  
        const newUser = {
          facebookId: profile.id,
          displayName: profile.displayName,
        };

        try {
          // Seeing the user already there in the DB or not...  
          let user = await User.findOne({ facebookId: profile.id });

          if (user) {
            // If user is already in the Database...  
            done(null, user);
          } else {
            // If user is not in the Database (new user)...  
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
