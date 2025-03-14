const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Order = require("../models/Order");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Error en la firma del webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const userId = session.metadata?.userId;
      const cartItems = JSON.parse(session.metadata?.cartItems || "[]");
      const total = session.amount_total / 100;

      const orderProducts = cartItems.map((item) => ({
        product: new mongoose.Types.ObjectId(item._id),
        quantity: item.quantity,
        price: item.price,
      }));

      const newOrder = new Order({
        user: new mongoose.Types.ObjectId(userId),
        products: orderProducts,
        total,
        status: "completed",
      });

      await newOrder.save();
      console.log("✅ Orden registrada desde Stripe webhook");
    } catch (error) {
      console.error("❌ Error al guardar orden desde webhook:", error.message);
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
