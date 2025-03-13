import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import Button from "../components/Button.jsx";

const Settings = () => {
  const { userProfile, updateUserProfile, getUserProfile } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    apellido: userProfile?.apellido || "",
    direccion: userProfile?.direccion || "",
    codigoPostal: userProfile?.codigoPostal || "",
    telefono: userProfile?.telefono || "",
    ciudad: userProfile?.ciudad || "",
    pais: userProfile?.pais || "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else if (!userProfile) {
      getUserProfile(token);
    } else {
      setFormData({
        apellido: userProfile.apellido || "",
        direccion: userProfile.direccion || "",
        codigoPostal: userProfile.codigoPostal || "",
        telefono: userProfile.telefono || "",
        ciudad: userProfile.ciudad || "",
        pais: userProfile.pais || "",
      });
      setLoading(false);
    }
  }, [userProfile, navigate, getUserProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    await updateUserProfile(formData);
    setHasChanges(false);
    window.location.reload();
  };

  if (loading) {
    return <p className="text-center text-white">Cargando configuración...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold">
          Bienvenido, {userProfile?.name || "Usuario"} 👋
        </h2>
        <p className="mt-2 text-gray-400">Correo: {userProfile?.email || "No disponible"}</p>

        <div className="mt-4 grid grid-cols-2 gap-4 text-left">
          <div>
            <label className="block text-gray-400">Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400">Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400">Ciudad:</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400">Código Postal:</label>
            <input
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400">País:</label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-left gap-4 mt-7">
          <Button size="small" className="!text-white !border-green-600 hover:!bg-green-900" onClick={handleSaveChanges} disabled={!hasChanges}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
