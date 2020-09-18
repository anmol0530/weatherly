const mongoose = require("mongoose");
const User = require("./user");

const weatherHistorySchema = new mongoose.Schema(
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
    sunrise: Date,
    sunset: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

weatherHistorySchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.history.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const History = mongoose.model("History", weatherHistorySchema);
module.exports = History;
