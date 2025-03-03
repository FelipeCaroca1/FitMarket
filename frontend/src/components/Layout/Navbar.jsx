import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import ConfirmModal from "../ConfirmModal";
import logo from "../../assets/img/logo.png";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    logoutUser();
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

        {user && (
          <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">
            Tienda
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/register" className="text-textSecondary hover:text-primary transition-colors">
              Registrarse
            </Link>
            <Link to="/login" className="text-textSecondary hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
          </>
        ) : (
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
            
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-white text-2xl hover:text-red-500 transition" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </>
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
