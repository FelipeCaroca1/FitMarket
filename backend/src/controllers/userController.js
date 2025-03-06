const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    console.log("Obteniendo perfil para ID:", req.user.id); // Log para depuración
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error en getUserProfile:", error);
    res.status(500).json({ message: "Error al obtener el perfil del usuario" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    console.log("ID del usuario recibido:", req.user.id); // Verificar si el ID llega
    console.log("Datos recibidos en req.body:", req.body); // Verificar datos del frontend

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar solo los campos proporcionados
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        user[key] = req.body[key];
      }
    });

    await user.save();

    console.log("Perfil actualizado correctamente:", user); // Confirmar que se guardó

    res.json({ message: "Perfil actualizado correctamente", user });
  } catch (error) {
    console.error("Error en updateUserProfile:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;  
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Cuenta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cuenta", error });
    }
};

module.exports = { getUserProfile, updateUserProfile, deleteUser };
