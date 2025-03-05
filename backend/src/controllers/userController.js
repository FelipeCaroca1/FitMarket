const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el perfil del usuario" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = req.body.name || user.name;
    user.apellido = req.body.apellido || user.apellido;
    user.direccion = req.body.direccion || user.direccion;
    user.codigoPostal = req.body.codigoPostal || user.codigoPostal;
    user.telefono = req.body.telefono || user.telefono;
    user.ciudad = req.body.ciudad || user.ciudad;
    user.pais = req.body.pais || user.pais;

    await user.save();

    res.json({ message: "Perfil actualizado correctamente", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
