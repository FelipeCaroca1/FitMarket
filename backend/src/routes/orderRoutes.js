const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/history", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "products.product",
        model: "Product",
        select: "name image price category stock",
      })
      .lean(); 

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el historial de compras." });
  }
});

module.exports = router;
