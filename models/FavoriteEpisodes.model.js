const { Schema, model } = require("mongoose");

const FavoriteEpisodesSchema = new Schema(
  {
    title: String,
    id: String,
    thumbnail: String,
    audio: String,
    audio_length_sec: Number,
    description: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const FavoriteEpisodes = model("FavoriteEpisodes", FavoriteEpisodesSchema);

module.exports = FavoriteEpisodes;
