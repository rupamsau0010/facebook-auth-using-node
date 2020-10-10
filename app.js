// Importing the Depandencies...
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");

const app = express();

// Passport config from services...
require("./services/passport")(passport);  // Exporting passport module while requiring it...

// middleware...
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Setting the Cookie using cookie-session module...
app.use(cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000, // Cookie will be valid up to 3 days...
    keys: [process.env.COOKEY_KEY]
}));
// app.use(cookieParser());

// Passport middleware...
app.use(passport.initialize());
app.use(passport.session());

// Routes...
app.use(authRoutes);

// Database connectivity and Running the app...
// Connect Database...
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000 || process.env.PORT, function(){console.log("Database is connected to MongoDB Atlas \nServer is started on port 3000")}))  // Running the App in port 3000...
  .catch((err) => console.log(err));