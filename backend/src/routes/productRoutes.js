const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getAllProducts, getProductById } = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  });

module.exports = router;
