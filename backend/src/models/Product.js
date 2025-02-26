const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  tallas: { type: [String], default: [] },
  detalles: {
    uso: { type: String },
    beneficios: [{ type: String }],
    ingredientes: [{ type: String }],
    tablaNutricional: {
      porcion: { type: String },
      calorias: { type: Number },
      proteinas: { type: String },
      grasas: { type: String },
      carbohidratos: { type: String },
      azucares: { type: String },
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
