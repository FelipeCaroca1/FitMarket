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
    stock: 50, 
    image: "https://rolos.cl/wp-content/uploads/2023/03/640f317d783495553f1dd817-600x596.jpg",
  },
  {
    name: "Mancuernas Ajustables 10kg",
    description: "Par de mancuernas ajustables con discos intercambiables.",
    price: 49990,
    category: "Equipamiento",
    stock: 20, 
    image: "https://i.imgur.com/JM8mHfh.jpg",
  },
  {
    name: "Creatina Monohidratada 500g",
    description: "Creatina pura para mejorar el rendimiento y la recuperación.",
    price: 19990,
    category: "Suplementos",
    stock: 30,
    image: "https://i.imgur.com/uT6sZ9K.jpg",
  },
  {
    name: "Cuerda para Saltar Profesional",
    description: "Cuerda de velocidad ajustable para entrenamientos intensos.",
    price: 9990,
    category: "Accesorios",
    stock: 40, 
    image: "https://i.imgur.com/Be0OwoN.jpg",
  },
  {
    name: "Colágeno Hidrolizado 300g",
    description: "Suplemento de colágeno para el cuidado de articulaciones y piel.",
    price: 15990,
    category: "Salud",
    stock: 25, 
    image: "https://i.imgur.com/vhklNXJ.jpg",
  },
  {
    name: "Barra Olímpica 20kg",
    description: "Barra olímpica profesional de acero inoxidable para levantamiento de pesas.",
    price: 129990,
    category: "Equipamiento",
    stock: 10,
    image: "https://i.imgur.com/0BjfOxP.jpg"
  },
  {
    name: "Tobilleras con Peso 5kg",
    description: "Par de tobilleras ajustables con peso para entrenamiento funcional.",
    price: 24990,
    category: "Accesorios",
    stock: 15,
    image: "https://i.imgur.com/WPjtM0O.jpg"
  },
  {
    name: "Zapatillas Running Pro",
    description: "Zapatillas deportivas con tecnología de amortiguación avanzada.",
    price: 59990,
    category: "Ropa",
    stock: 20,
    image: "https://i.imgur.com/P9HgKVs.jpg"
  },
  {
    name: "Leggings Deportivos",
    description: "Leggings de compresión para entrenamientos de alto rendimiento.",
    price: 19990,
    category: "Ropa",
    stock: 25,
    image: "https://i.imgur.com/qvCnHy7.jpg"
  },
  {
    name: "Camiseta Dry-Fit",
    description: "Camiseta deportiva transpirable para entrenamientos intensos.",
    price: 14990,
    category: "Ropa",
    stock: 30,
    image: "https://i.imgur.com/g2ZJPBc.jpg"
  },
  {
    name: "BCAA 2:1:1 300g",
    description: "Aminoácidos de cadena ramificada para mejorar la recuperación muscular.",
    price: 22990,
    category: "Suplementos",
    stock: 40,
    image: "https://i.imgur.com/vhtYpQp.jpg"
  },
  {
    name: "Barra de Proteína (Caja de 12)",
    description: "Barras de proteína bajas en azúcar, ideales para snack post-entrenamiento.",
    price: 28990,
    category: "Alimentos",
    stock: 50,
    image: "https://i.imgur.com/WLr6Nu6.jpg"
  },
  {
    name: "Pre-entreno Explosivo 400g",
    description: "Suplemento pre-entreno con cafeína y beta-alanina para potenciar el rendimiento.",
    price: 21990,
    category: "Suplementos",
    stock: 35,
    image: "https://i.imgur.com/Cm5WfcE.jpg"
  },
  {
    name: "Banda Elástica de Resistencia",
    description: "Banda de resistencia ideal para calistenia y rehabilitación.",
    price: 12990,
    category: "Accesorios",
    stock: 30,
    image: "https://i.imgur.com/Nx4L9GG.jpg"
  },
  {
    name: "Guantes de Gimnasio",
    description: "Guantes acolchados con agarre antideslizante para levantamiento de pesas.",
    price: 9900,
    category: "Accesorios",
    stock: 20,
    image: "https://i.imgur.com/mTWcb7W.jpg"
  },
  {
    name: "Botella Deportiva 1L",
    description: "Botella reutilizable con marcador de hidratación y diseño ergonómico.",
    price: 7990,
    category: "Accesorios",
    stock: 40,
    image: "https://i.imgur.com/tuBjZ0P.jpg"
  }
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
