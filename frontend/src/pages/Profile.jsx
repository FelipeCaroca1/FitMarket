import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { userProfile, deleteAccount, updateUserProfile, getUserProfile } = useUser();
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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
      navigate("/login"); // Solo redirige si NO hay token
    } else if (!userProfile) {
      getUserProfile(token); // Intenta recuperar el perfil antes de redirigir
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

        <div className="flex justify-center gap-4 mt-6">
          <Button size="medium" onClick={handleSaveChanges} disabled={!hasChanges}>
            Guardar cambios
          </Button>
          <Button size="medium" onClick={handleLogout}>Cerrar Sesión</Button>
          <Button size="medium" onClick={handleDeleteAccount}>Eliminar Cuenta</Button>
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
