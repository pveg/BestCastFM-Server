const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const fileUploader = require("../config/cloudinary.config")


// finds user by username

router.get("/profile/:username", (req, res, next) => {
  const { username } = req.params;
  console.log(username);

  const findOneUser = async () => {
    try {
      let response = await User.findOne({ username })
        .populate("favoriteEpisodes")
        .populate("favoritePodcasts");
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      res.json(error);
    }
  };
  findOneUser();
});

//Get favorite episodes
router.get("/profile/:username/favorite-episodes", (req, res, next) => {
  const { username } = req.params;

  const getFavoriteEpisodes = async () => {
    try {
      let response = await User.findOne({ username }).populate(
        "favoriteEpisodes"
      );
      res.status(200).json(response);
    } catch (error) {
      res.json(error);
    }
  };
  getFavoriteEpisodes();
});

//get favorite podcasts
router.get("/profile/:username/favorite-podcasts", (req, res, next) => {
  const { username } = req.params;

  const getFavoritePodcasts = async () => {
    try {
      let response = await User.findOne({ username }).populate(
        "favoritePodcasts"
      );
      res.status(200).json(response);
    } catch (error) {
      res.json(error);
    }
  };
  getFavoritePodcasts();
});

//edit user

router.put("/profile/:username/edit", async (req, res, next) => {
  const { username } = req.params;
  const { name, surname, password, email, profileImage } = req.body;
  const findToUpdate = async () => {
    try {
      let response = await User.findOneAndUpdate(
        username,
        { name, surname, password, email, profileImage },
        { new: true }
      );
      res.status(201).json(findToUpdate);
    } catch (error) {
      res.json(error);
    }
  };
  findToUpdate();
});


//delete user

router.delete("/profile/:username/delete", (req, res, next) => {
  const { username } = req.params;

  const deleteUser = async () => {
    try {
      let response = await User.findOneAndDelete(username);
      res.status(200).json({
        message: `The user with username ${username} was successfully deleted from the database.`,
      });
    } catch (error) {
      res.json(error);
    }
  };
  deleteUser();
});


module.exports = router;
