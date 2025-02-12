import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; // Importamos el contexto
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const { isAuthenticated, isRegistered } = useContext(AuthContext);

  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" />
      </div>
      <div className="space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">Inicio</Link>
        <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">Tienda</Link>

        {/* ✅ Lógica dinámica según el estado del usuario */}
        {!isAuthenticated && !isRegistered && (
          <Link to="/register" className="text-textSecondary hover:text-primary transition-colors">
            Registrarse
          </Link>
        )}
        {!isAuthenticated && isRegistered && (
          <Link to="/login" className="text-textSecondary hover:text-primary transition-colors">
            Iniciar Sesión
          </Link>
        )}
        {isAuthenticated && (
          <Link to="/profile" className="text-textSecondary hover:text-primary transition-colors">
            Perfil
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
