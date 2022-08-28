const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");

router.post("/favorites/:username/:podcastId", (req, res, next) => {
  const { podcastId, username } = req.params;

  try {
    const createFavoritePodcasts = async () => {
      let newFavorite = await FavoritePodcasts.create({ podcastId }, {});
      let pushToUser = await User.findOne(
        { username },
        { $push: { favoritePodcasts: newFavorite._id } }
      );
    };
  } catch (error) {
    res.json(error);
  }
});

//adds episode to favoriteEpisodes
router.post("/favorites/:username/:episodeId", (req, res, next) => {
  const { episodeId, username } = req.params;

  try {
    const createFavoritePodcasts = async () => {
      let newFavorite = await FavoriteEpisodes.create({ episodeId }, {});
      let pushToUser = await User.findOne(
        { username },
        { $push: { favoriteEpisodes: newFavorite._id } }
      );
    };
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
