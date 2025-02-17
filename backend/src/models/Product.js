const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }, // 🔥 Se agregó stock
  image: { type: String, required: true }, // URL de la imagen
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
