import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import useUser from "../../context/useUser";
import AuthContext from "../../context/AuthContext"; // ⬅️ Importamos AuthContext
import CartContext from "../../context/CartContext";
import ConfirmModal from "../ConfirmModal";
import logo from "../../assets/img/logo.png";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { userProfile } = useUser(); // Mantiene la información del usuario
  const { logoutUser } = useContext(AuthContext); // ⬅️ Ahora `logoutUser` viene de AuthContext
  const { cartItems } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    logoutUser(); // ⬅️ Ahora esto no dará error
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">
          Inicio
        </Link>

        {userProfile ? (
          <>
            <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">
              Tienda
            </Link>
            <Link to="/profile" className="text-textSecondary hover:text-primary transition-colors">
              Perfil
            </Link>
            <button
              onClick={handleLogoutClick}
              className="text-textSecondary hover:text-red-500 transition-colors"
            >
              Cerrar Sesión
            </button>
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-white text-2xl hover:text-red-500 transition" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </>
        ) : (
          !localStorage.getItem("token") ? (
            <>
              <Link to="/register" className="text-textSecondary hover:text-primary transition-colors">
                Registrarse
              </Link>
              <Link to="/login" className="text-textSecondary hover:text-primary transition-colors">
                Iniciar Sesión
              </Link>
            </>
          ) : (
            <p className="text-gray-400">Cargando usuario...</p>
          )
        )}
      </div>

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
