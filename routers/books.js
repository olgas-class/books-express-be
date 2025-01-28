const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// INDEX
router.get("/", bookController.index);

// SHOW
router.get("/:slug", bookController.show);

// STORE DI UN LIBRO
router.post("/", bookController.store);

// SALVATAGGIO DI UNA REVIEW DI UN LIBRO
router.post("/:id/reviews", bookController.storeReview);

module.exports = router;
