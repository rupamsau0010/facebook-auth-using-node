// Importing the Depandencies...
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware...
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database connectivity and Running the app...
// Connect Database...
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000 || process.env.PORT, function(){console.log("Database is connected to MongoDB Atlas \nServer is started on port 3000")}))  // Running the App in port 3000...
  .catch((err) => console.log(err));