const express = require("express");
const { createCheckoutSession } = require("../controllers/stripeController");

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

// ✅ Redirección cuando el pago es exitoso
router.get("/success", (req, res) => {
    res.redirect("http://localhost:5173/success");
});

// ✅ Redirección cuando el pago falla
router.get("/cancel", (req, res) => {
    res.redirect("http://localhost:5173/cancel");
});

module.exports = router;
