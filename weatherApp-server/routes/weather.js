const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  currentWeather,
  getHistory,
  deleteHistory,
  totalHistory,
} = require("../handlers/weather");

// prefix - /api/users/:id/history
router.route("/").get(totalHistory).post(currentWeather);

router.route("/:history_id").get(getHistory).delete(deleteHistory);

module.exports = router;
