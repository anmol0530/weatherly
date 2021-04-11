const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/weatherApp", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Search = require("./search");
