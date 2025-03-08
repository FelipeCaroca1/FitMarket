import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import useCart from "../../hooks/useCart.js";

import logo from "../../assets/img/logo.png";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { userProfile } = useUser();
  const { cartItems } = useCart();

  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
     
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" />
      </div>

     
      <div className="flex-1 flex justify-center space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">
          Inicio
        </Link>

        <Link to="/about" className="text-textSecondary hover:text-red-500 transition-colors">
          Sobre Nosotros
        </Link>

        {userProfile && (
          <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">
            Tienda
          </Link>
        )}
        
      </div>

      <div className="flex items-center space-x-6">
        {userProfile ? (
          <>
            <Link to="/profile">
              <FiUser className="text-white text-2xl hover:text-red-500 transition" />
            </Link>

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

    </nav>
  );
};

export default Navbar;
