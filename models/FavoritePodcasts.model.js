const { Schema, model } = require("mongoose");

const FavoritePodcastsSchema = new Schema(
  {
    title: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const favoritePodcasts = model("FavoritePodcasts", FavoritePodcastsSchema);

module.exports = favoritePodcasts;
