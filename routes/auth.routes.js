const router = require("express").Router();
const fileUploader = require('../config/cloudinary.config');

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

/* Authentication middleware config */
const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User.model");

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("The token : (ornot)", req.payload);

  res.status(200).json(req.payload);
});

router.post("/signup", (req, res) => {
  const { username, password, email, name, surname, profileImage } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  //Backend password verification
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  /* If user is found */
  User.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
          email,
          surname,
          name,
          profileImage,
        });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }

        const { _id, username, email, surname, name, profileImage } = user;
        const payload = { _id, username, email, surname, name, profileImage };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "14d",
        });

        return res.status(200).json({ authToken: authToken });
      });
    })

    .catch((err) => {
      next(err);
      return res.status(500).render("login", { errorMessage: err.message });
    });
});

module.exports = router;
