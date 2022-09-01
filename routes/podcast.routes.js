const router = require("express").Router();
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const favoritePodcasts = require("../models/FavoritePodcasts.model");
const User = require("../models/User.model");
const itunesPodcasts = require('itunes-podcasts')

//searchs for a specific podcast via name
router.post("/podcasts", async (req, res, next) => {
  const { searchValue } = req.body;
  console.log(searchValue)

  itunesPodcasts.getPodcasts(searchValue)
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

//search for the episodes on a specific podcast
router.post("/podcasts/:podcastId", async (req, res, next) => {
  const { podcastId } = req.params;

  itunesPodcasts.getPodcastWithEpisodes(podcastId)
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

module.exports = router;

