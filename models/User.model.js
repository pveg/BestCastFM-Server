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
            unique: true,
    },
    password: {
      type: String,
            required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/daknbj7xw/image/upload/v1661966813/BestCastFM/blank-profile-picture-973460_640_b7ibcr.webp",
    },
    favoriteEpisodes: [
      { type: Schema.Types.ObjectId, ref: "FavoriteEpisodes" },
    ],
    favoritePodcasts: [
      { type: Schema.Types.ObjectId, ref: "FavoritePodcasts" },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
