const { Schema, model } = require("mongoose");

const FavoritePodcastsSchema = new Schema(
  {
    collectionName: String,
    artworkUrl600: String,
    collectionId: String,
  },
  {
    timestamps: true,
  }
);

const favoritePodcasts = model("FavoritePodcasts", FavoritePodcastsSchema);

module.exports = favoritePodcasts;
