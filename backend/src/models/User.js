const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apellido: { type: String },
    direccion: { type: String },
    codigoPostal: { type: String },
    telefono: { type: String },
    ciudad: { type: String },
    pais: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
