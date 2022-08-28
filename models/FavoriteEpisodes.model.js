const { Schema, model } = require("mongoose");

const FavoriteEpisodesSchema = new Schema(
  {
    title_original: String,
    episodeId: String,
    thumbnail: String,
    audio_file: String,
    audio_length_sec: Number,
    description_original: String,
  },
  {
    timestamps: true,
  }
);

const FavoriteEpisodes = model("FavoriteEpisodes", FavoriteEpisodesSchema);

module.exports = FavoriteEpisodes;
