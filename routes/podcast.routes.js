const router = require("express").Router();
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const { Client } = require("podcast-api");
const User = require("../models/User.model");

//searchs for a specific podcast via name
router.get("/podcasts", (req, res, next) => {
  const client = Client({ apiKey: process.env.LISTEN_API_KEY || null });
    const {searchValue} = req.body;

  client
    .typeahead({
      q: searchValue,
      show_podcasts: 1,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data.errorMessage);
    });
});


//search for the episodes on a specific podcast
router.get("/podcasts/:podcastId", (req, res, next) => {
  const client = Client({ apiKey: process.env.LISTEN_API_KEY || null });
  const {podcastId}  = req.params;

  client
    .fetchPodcastById({
      id: podcastId,
      next_episode_pub_date: 1479154463000,
      sort: "recent_first",
    })
    .then((response) =>
        res.json(response.data))
    .catch((error) => {
      console.log(error);
    });
});





module.exports = router;
