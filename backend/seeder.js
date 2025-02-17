const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const Product = require("./src/models/Product");

dotenv.config();

// 🔥 Datos iniciales de productos con stock corregido
const products = [
  {
    name: "Proteína Whey 1kg",
    description: "Proteína de suero de leche con 25g de proteína por porción.",
    price: 29990,
    category: "Suplementos",
    stock: 50, // 🔥 Se agregó stock
    image: "https://example.com/whey.jpg",
  },
  {
    name: "Mancuernas Ajustables 10kg",
    description: "Par de mancuernas ajustables con discos intercambiables.",
    price: 49990,
    category: "Equipamiento",
    stock: 20, // 🔥 Se agregó stock
    image: "https://example.com/mancuernas.jpg",
  },
  {
    name: "Creatina Monohidratada 500g",
    description: "Creatina pura para mejorar el rendimiento y la recuperación.",
    price: 19990,
    category: "Suplementos",
    stock: 30, // 🔥 Se agregó stock
    image: "https://example.com/creatina.jpg",
  },
  {
    name: "Cuerda para Saltar Profesional",
    description: "Cuerda de velocidad ajustable para entrenamientos intensos.",
    price: 9990,
    category: "Accesorios",
    stock: 40, // 🔥 Se agregó stock
    image: "https://example.com/cuerda.jpg",
  },
  {
    name: "Colágeno Hidrolizado 300g",
    description: "Suplemento de colágeno para el cuidado de articulaciones y piel.",
    price: 15990,
    category: "Salud",
    stock: 25, // 🔥 Se agregó stock
    image: "https://example.com/colageno.jpg",
  },
];

// 🔥 Insertar productos en la base de datos
const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // 🔥 Borra todos los productos previos
    await Product.insertMany(products);
    console.log("✅ Productos insertados correctamente con stock");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
    process.exit(1);
  }
};

// Ejecutar la función
seedProducts();
