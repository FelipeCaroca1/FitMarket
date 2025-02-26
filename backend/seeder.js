const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const Product = require("./src/models/Product");

dotenv.config();


const products = [
  {
    name: "Proteína Whey 1kg",
    description: "Proteína de suero de leche con 25g de proteína por porción.",
    price: 29990,
    category: "Suplementos",
    stock: 50, 
    image: "http://localhost:5000/images/Proteina.jpg",
  },
  {
    name: "Mancuernas Ajustables 10kg",
    description: "Par de mancuernas ajustables con discos intercambiables.",
    price: 49990,
    category: "Equipamiento",
    stock: 20, 
    image: "http://localhost:5000/images/mancuernas.jpg",
  },
  {
    name: "Creatina Monohidratada 500g",
    description: "Creatina pura para mejorar el rendimiento y la recuperación.",
    price: 19990,
    category: "Suplementos",
    stock: 30,
    image: "http://localhost:5000/images/Creatina.jpg",
  },
  {
    name: "Cuerda para Saltar Profesional",
    description: "Cuerda de velocidad ajustable para entrenamientos intensos.",
    price: 9990,
    category: "Accesorios",
    stock: 40, 
    image: "http://localhost:5000/images/cuerda.jpg",
  },
  {
    name: "Colágeno Hidrolizado 300g",
    description: "Suplemento de colágeno para el cuidado de articulaciones y piel.",
    price: 15990,
    category: "Salud",
    stock: 25, 
    image: "http://localhost:5000/images/colageno.jpg",
  },
  {
    name: "Barra Olímpica 20kg",
    description: "Barra olímpica profesional de acero inoxidable para levantamiento de pesas.",
    price: 129990,
    category: "Equipamiento",
    stock: 10,
    image: "http://localhost:5000/images/barraOlimpica.jpg"
  },
  {
    name: "Tobilleras con Peso 5kg",
    description: "Par de tobilleras ajustables con peso para entrenamiento funcional.",
    price: 24990,
    category: "Accesorios",
    stock: 15,
    image: "http://localhost:5000/images/tobilleras.jpg"
  },
  {
    name: "Zapatillas Running Pro",
    description: "Zapatillas deportivas con tecnología de amortiguación avanzada.",
    price: 59990,
    category: "Ropa",
    stock: 20,
    image: "http://localhost:5000/images/zapatillas.jpg"
  },
  {
    name: "Leggings Deportivos",
    description: "Leggings de compresión para entrenamientos de alto rendimiento.",
    price: 19990,
    category: "Ropa",
    stock: 25,
    image: "http://localhost:5000/images/leggins.jpg"
  },
  {
    name: "Camiseta Dry-Fit",
    description: "Camiseta deportiva transpirable para entrenamientos intensos.",
    price: 14990,
    category: "Ropa",
    stock: 30,
    image: "http://localhost:5000/images/camiseta.jpg"
  },
  {
    name: "BCAA 2:1:1 300g",
    description: "Aminoácidos de cadena ramificada para mejorar la recuperación muscular.",
    price: 22990,
    category: "Suplementos",
    stock: 40,
    image: "http://localhost:5000/images/bcaa.jpg"
  },
  {
    name: "Barra de Proteína (Caja de 12)",
    description: "Barras de proteína bajas en azúcar, ideales para snack post-entrenamiento.",
    price: 28990,
    category: "Alimentos",
    stock: 50,
    image: "http://localhost:5000/images/barrasProteina.jpg"
  },
  {
    name: "Pre-entreno Explosivo 400g",
    description: "Suplemento pre-entreno con cafeína y beta-alanina para potenciar el rendimiento.",
    price: 21990,
    category: "Suplementos",
    stock: 35,
    image: "http://localhost:5000/images/preEntreno.jpg"
  },
  {
    name: "Banda Elástica de Resistencia",
    description: "Banda de resistencia ideal para calistenia y rehabilitación.",
    price: 12990,
    category: "Accesorios",
    stock: 30,
    image: "http://localhost:5000/images/bandaElastica.jpg"
  },
  {
    name: "Guantes de Gimnasio",
    description: "Guantes acolchados con agarre antideslizante para levantamiento de pesas.",
    price: 9900,
    category: "Accesorios",
    stock: 20,
    image: "http://localhost:5000/images/guantes.jpg"
  },
  {
    name: "Botella Deportiva 1L",
    description: "Botella reutilizable con marcador de hidratación y diseño ergonómico.",
    price: 7990,
    category: "Accesorios",
    stock: 40,
    image: "http://localhost:5000/images/botella.jpg"
  }
];


const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); 
    await Product.insertMany(products);
    console.log("✅ Productos insertados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
    process.exit(1);
  }
};


seedProducts();
