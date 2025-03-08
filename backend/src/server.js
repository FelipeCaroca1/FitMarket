const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const userRoutes = require("./routes/userRoutes");


require('dotenv').config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://fitmarket-frontend.onrender.com", 
    credentials: true,
  })
);

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../public/img")));


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
