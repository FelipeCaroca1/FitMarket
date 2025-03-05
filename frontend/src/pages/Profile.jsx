import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

const Profile = () => {
  const { user, logoutUser, deleteAccount, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    apellido: user?.apellido || "",
    direccion: user?.direccion || "",
    codigoPostal: user?.codigoPostal || "",
    telefono: user?.telefono || "",
    ciudad: user?.ciudad || "",
    pais: user?.pais || "",
  });

  useEffect(() => {
    if (user === null) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!user) navigate("/login");
    }
  }, [user, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    await updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => setIsLogoutModalOpen(true);
  const handleDeleteAccount = () => setIsDeleteModalOpen(true);

  const confirmLogout = () => {
    logoutUser();
    setIsLogoutModalOpen(false);
  };

  const confirmDeleteAccount = async () => {
    await deleteAccount();
    setIsDeleteModalOpen(false);
    navigate("/");
  };

  if (loading) {
    return <p className="text-center text-white">Cargando perfil...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold">
          Bienvenido, {user?.name || "Usuario"} 👋
        </h2>
        <p className="mt-2 text-gray-400">Correo: {user?.email || "No disponible"}</p>

        <div className="mt-4 text-left">
          <label className="block text-gray-400">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />

          <label className="block text-gray-400 mt-2">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />

          <label className="block text-gray-400 mt-2">Código Postal:</label>
          <input
            type="text"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />

          <label className="block text-gray-400 mt-2">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />

          <label className="block text-gray-400 mt-2">Ciudad:</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />

          <label className="block text-gray-400 mt-2">País:</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <Button size="medium" onClick={handleSaveChanges}>
              Guardar cambios
            </Button>
          ) : (
            <Button size="medium" onClick={handleEditToggle}>
              Editar
            </Button>
          )}
          <Button size="medium" onClick={handleLogout}>Cerrar Sesión</Button>
          <Button size="medium" onClick={handleDeleteAccount}>
            Eliminar Cuenta
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar Cuenta"
        message="¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible."
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
