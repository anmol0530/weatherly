const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createSearch,
  getSearch,
  deleteSearch,
  allSearches,
} = require("../handlers/searches");

// prefix - /api/users/:id/searches
router.route("/").get(allSearches).post(createSearch);

router.route("/:search_id").get(getSearch).delete(deleteSearch);

module.exports = router;
