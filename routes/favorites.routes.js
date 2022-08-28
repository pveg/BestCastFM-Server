const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");

router.post("/favorites/:username/:podcastId", (req, res, next) => {
  const { podcastId, username } = req.params;

  const podcastById = async () => {
    try {
      let response = await client.fetchPodcastById({
        id: podcastId,
        next_episode_pub_date: 1479154463000,
        sort: "recent_first",
      });
      const {
        title,
        image,
        episodes,
        description_original,
        genre,
        podcastListenId,
        audio_length_sec,
        audio_file,
        title_original,
        thumbnail,
      } = response.data;
      const createFavoritePodcast = await FavoritePodcasts.create({
        title,
        image,
        episodes,
        description_original,
        genre,
        podcastListenId,
        audio_length_sec,
        audio_file,
        title_original,
        thumbnail,
      });
      const pushToUser = await User.findOne(
        { username },
        { $push: { favoritePodcasts: createFavoritePodcast._id } }
      );
    } catch (error) {
      res.json(error.response.data.errorMessage);
    }
  };
  podcastById();

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