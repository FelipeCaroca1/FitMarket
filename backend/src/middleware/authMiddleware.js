const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "No autorizado, usuario no encontrado" });
      }
      console.log("✅ Usuario autenticado:", req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado, token inválido" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = { protect };
