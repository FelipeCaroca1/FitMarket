const express = require("express");
const { createCheckoutSession } = require("../controllers/stripeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

router.get("/success", (req, res) => {
  res.redirect("https://fitmarket-frontend.onrender.com/success");
});

router.get("/cancel", (req, res) => {
  res.redirect("https://fitmarket-frontend.onrender.com/cancel");
});

module.exports = router;
