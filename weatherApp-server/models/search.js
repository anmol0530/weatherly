const mongoose = require("mongoose");
const User = require("./user");

const searchSchema = new mongoose.Schema(
  {
    weather: String,
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    temp: Number,
    temp_max: Number,
    temp_min: Number,
    sunrise: Number,
    sunset: Number,
    timezone: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

searchSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.searches.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Search = mongoose.model("Search", searchSchema);
module.exports = Search;
