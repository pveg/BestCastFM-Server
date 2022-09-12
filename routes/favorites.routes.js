const router = require("express").Router();
const User = require("../models/User.model");
const FavoritePodcasts = require("../models/FavoritePodcasts.model");
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

module.exports = router;
