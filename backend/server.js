const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const stripeRoutes = require("./src/routes/stripeRoutes");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../backend/public/img")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/checkout", stripeRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
