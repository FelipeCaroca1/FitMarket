const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Middleware para analizar JSON
app.use(express.json());

// Servir imágenes estáticas desde la carpeta public/images
app.use("/images", express.static(path.join(__dirname, "../public/img")));


// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Ruta para comprobar que el servidor funciona
app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
