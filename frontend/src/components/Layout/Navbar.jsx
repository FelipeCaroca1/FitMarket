import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; // Importamos el contexto
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext); // 🔥 Usamos `user` en lugar de `isAuthenticated`

  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" />
      </div>
      <div className="space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">Inicio</Link>
        <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">Tienda</Link>

        {/* ✅ Si el usuario NO está autenticado, muestra "Registrarse" o "Iniciar Sesión" */}
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

        {/* ✅ Si el usuario está autenticado, muestra "Perfil" y "Cerrar Sesión" */}
        {user && (
          <>
            <Link to="/Profile" className="text-textSecondary hover:text-primary transition-colors">
              Perfil
            </Link>
            <button
              onClick={logoutUser}
              className="text-textSecondary hover:text-red-500 transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
