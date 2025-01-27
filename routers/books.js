const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// INDEX
router.get("/", bookController.index);

// SHOW
router.get("/:slug", bookController.show);

module.exports = router;
