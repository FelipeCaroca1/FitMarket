import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"; 

const Navbar = () => {
  return (
    <nav className="bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-20 w-auto" /> 
      </div>
      <div className="space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">Inicio</Link>
        <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">Tienda</Link>
        <Link to="/profile" className="text-textSecondary hover:text-primary transition-colors">Perfil</Link>
      </div>
    </nav>
  );
};

export default Navbar;
