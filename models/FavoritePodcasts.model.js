const { Schema, model } = require("mongoose");

const FavoritePodcastsSchema = new Schema(
  {
    title: {type: String, required: true},
    image: String,
    episodes: Number,
    description_original: String,
    genre: String,
    podcastId: String,
    audio_length_sec: Number,
    audio_file: String,
    title_original: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

const favoritePodcasts = model("FavoritePodcasts", FavoritePodcastsSchema);

module.exports = favoritePodcasts;
