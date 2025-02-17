const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("../controllers/productController");

// ✅ Ruta para obtener todos los productos
router.get("/", getAllProducts);

// ✅ Ruta para obtener un solo producto por ID
router.get("/:id", getProductById);

module.exports = router;
