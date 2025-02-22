import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal"; // ✅ Modal de confirmación
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true); // ✅ Abre la modal al hacer clic en "Cerrar Sesión"
  };

  const confirmLogout = () => {
    logoutUser();
    setIsModalOpen(false); // Cierra la modal después de cerrar sesión
  };

  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" />
      </div>

      <div className="space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">
          Inicio
        </Link>

        {/* ✅ Mostrar "Tienda" solo si el usuario está logueado */}
        {user && (
          <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">
            Tienda
          </Link>
        )}

        {/* ✅ Si el usuario NO está autenticado */}
        {!user && (
          <>
            <Link to="/register" className="text-textSecondary hover:text-primary transition-colors">
              Registrarse
            </Link>
            <Link to="/login" className="text-textSecondary hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
          </>
        )}

        {/* ✅ Si el usuario está autenticado */}
        {user && (
          <>
            <Link to="/Profile" className="text-textSecondary hover:text-primary transition-colors">
              Perfil
            </Link>
            <button
              onClick={handleLogoutClick}
              className="text-textSecondary hover:text-red-500 transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>

      {/* ✅ Modal de confirmación con botón reutilizable */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
        onConfirm={confirmLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
