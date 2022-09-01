const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
const FavoriteEpisodes = require("../models/FavoriteEpisodes.model");
const itunesPodcasts = require("itunes-podcasts");

//Adds podcast to favorites
router.post("/favorites/:username/:podcastId", async (req, res, next) => {
  const { podcastId, username } = req.params;
  console.log(podcastId, username);

  itunesPodcasts
    .getPodcastWithEpisodes(podcastId)
    .then((response) => {
      console.log(response.title)
      const { image, title } = response;
      FavoritePodcasts.create({
        title,
        image,
      })
      .then((response) => {
        const {id} = response._id
        User.findOneAndUpdate(
           {username} ,
          { $push: { favoritePodcasts: id } }
        );
        console.log(username)
      });
    })
    .then(() => res.status(201).json("Added to favorites"))
    .catch((err) => res.json(err));
});

router.post("/favorites/:username/:episodeId", async (req, res, next) => {
  const { episodeId, username } = req.params;

  try {
    let response = await client.fetchEpisodeById({
      id: episodeId,
      show_transcript: 1,
    });
    console.log(response.data);
    const {
      title,
      id,
      thumbnail,
      audio,
      audio_length_sec,
      description,
      image,
    } = response.data;
    const createFavoriteEpisodes = await FavoriteEpisodes.create({
      title,
      id,
      thumbnail,
      audio,
      audio_length_sec,
      description,
      image,
    });
    console.log(createFavoriteEpisodes._id);
    await User.findOneAndUpdate(
      { username },
      { $push: { favoriteEpisodes: createFavoriteEpisodes._id } }
    );
    res.status(201).json("Added to favorites");
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
