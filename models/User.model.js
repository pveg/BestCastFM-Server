const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteEpisodes: [{type: Schema.Types.ObjectId, ref: 'FavoriteEpisodes'}],
    favoritePodcasts: [{type: Schema.Types.ObjectId, ref: 'FavoritePodcasts'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
