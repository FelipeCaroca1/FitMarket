import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

const Profile = () => {
  const { user, logoutUser, deleteAccount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!user) navigate("/login");
    }
  }, [user, navigate]);

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

        <div className="flex justify-center gap-4 mt-6">
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
