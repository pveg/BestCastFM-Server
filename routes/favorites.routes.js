const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const { Client } = require("podcast-api");

//Adds podcast to favorites
router.post("/favorites/:username/:podcastId", (req, res, next) => {
  const client = Client({ apiKey: process.env.LISTEN_API_KEY || null });
  const { podcastId, username } = req.params;
  console.log(podcastId)
  console.log(username)

  const podcastById = async () => {
    try {
      let response = await client.fetchPodcastById({
        id: podcastId,
        next_episode_pub_date: 1479154463000,
        sort: "recent_first",
      });
      console.log(response.data)
      const {
        title,
        image,
        id,
        total_episodes,
      } = response.data;
      const createFavoritePodcast = await FavoritePodcasts.create({
        title,
        image,
        id,
        total_episodes,
      });
      const pushToUser = await User.findOne(
        { username },
        { $push: { favoritePodcasts: createFavoritePodcast._id } }
      );
    } catch (error) {
      res.json(error);
    }
  };
  podcastById();

});

//adds episode to favoriteEpisodes
/* router.post("/favorites/:username/:episodeId", (req, res, next) => {
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
    }); */
    
    module.exports = router;
    
    /*   try {
      const createFavoritePodcasts = async () => {
        let newFavorite = await FavoritePodcasts.create({ podcastId }, {});
        let pushToUser = await User.findOne(
          { username },
          { $push: { favoritePodcasts: newFavorite._id } }
        );
      };
    } catch (error) {
      res.json(error);
    } */