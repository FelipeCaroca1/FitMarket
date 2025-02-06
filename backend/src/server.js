const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Importamos la conexión a MongoDB

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Ruta de prueba para verificar que el servidor funcione
app.get("/", (req, res) => {
  res.send("API de FitMarket funcionando 🚀");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
