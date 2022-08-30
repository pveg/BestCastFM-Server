const router = require("express").Router();
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const favoritePodcasts = require("../models/FavoritePodcasts.model");
const { Client } = require("podcast-api");
const User = require("../models/User.model");

//searchs for a specific podcast via name
router.post("/podcasts", async (req, res, next) => {
  const client = Client({ apiKey: process.env.LISTEN_API_KEY || null });
  const { searchValue } = req.body;
  console.log(searchValue)
  const podcastByName = async () => {
    try {
      let response = await client.typeahead({
        q: searchValue ,
        show_podcasts: 1,
      });
      console.log(response.data)
      res.json(response.data);
    } catch (error) {
      res.json(error.response.data.errorMessage);
    }
  };
  podcastByName();
});

//search for the episodes on a specific podcast
router.get("/podcasts/:podcastId", (req, res, next) => {
  const client = Client({ apiKey: process.env.LISTEN_API_KEY || null });
  const { podcastId } = req.params;

  const podcastById = async () => {
    try {
      let response = await client.fetchPodcastById({
        id: podcastId,
        next_episode_pub_date: 1479154463000,
        sort: "recent_first",
      });
      res.json(response.data);
    } catch (error) {
      res.json(error.response.data.errorMessage);
    }
  };
  podcastById();
});

module.exports = router;

