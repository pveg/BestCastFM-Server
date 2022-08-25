const { Schema, model } = require("mongoose");

const FavoriteEpisodesSchema = new Schema(
  {
    title_original: String,
    id: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

const FavoriteEpisodes = model("FavoriteEpisodes", FavoriteEpisodesSchema);

module.exports = FavoriteEpisodes;
