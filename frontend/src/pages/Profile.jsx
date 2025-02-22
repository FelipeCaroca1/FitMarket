import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal"; // ✅ Importamos la modal de confirmación

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Estado para la modal

  useEffect(() => {
    if (user === null) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!user) navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setIsModalOpen(true); // 🔥 Abre la modal al presionar "Cerrar Sesión"
  };

  const confirmLogout = () => {
    logoutUser(); // ✅ Ejecuta el cierre de sesión
    setIsModalOpen(false); // Cierra la modal después de la acción
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
        <p className="mt-2 text-gray-400">
          Correo: {user?.email || "No disponible"}
        </p>

        {/* ✅ Botón que abre la modal */}
        <Button onClick={handleLogout} className="mt-6">
          Cerrar Sesión
        </Button>
      </div>

      {/* ✅ Modal de confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
        onConfirm={confirmLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
