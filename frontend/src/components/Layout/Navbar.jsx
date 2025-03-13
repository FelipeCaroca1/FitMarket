import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import useUser from "../../hooks/useUser.js";
import useCart from "../../hooks/useCart.js";
import logo from "../../assets/img/logo.png";
import { FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { Settings, History, FileText, HelpCircle, LogOut } from "lucide-react";
import ConfirmModal from "../ConfirmModal.jsx";
import useAuth from "../../hooks/useAuth.js";

const Navbar = () => {
  const { userProfile, getUserProfile } = useUser();
  const { cartItems } = useCart();
  const { openCart } = useContext(CartContext);
  const { logoutUser } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userProfile) getUserProfile(token);
  }, [userProfile, getUserProfile]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[40] bg-background text-textPrimary border-b-2 border-textSecondary px-8 py-1 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="FitMarket Logo" className="h-16 w-auto md:h-20" />
      </div>

      <div className="hidden md:flex flex-1 justify-center space-x-6">
        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">Inicio</Link>
        <Link to="/about" className="text-textSecondary hover:text-primary transition-colors">Sobre Nosotros</Link>
        <Link to="/guide" className="text-textSecondary hover:text-primary transition-colors">Guía</Link>
        {!userProfile && !localStorage.getItem("token") && (
          <>
            <Link to="/register" className="text-textSecondary hover:text-primary transition-colors">Registrarse</Link>
            <Link to="/login" className="text-textSecondary hover:text-primary transition-colors">Iniciar Sesión</Link>
          </>
        )}
        {userProfile && <Link to="/shop" className="text-textSecondary hover:text-primary transition-colors">Tienda</Link>}
      </div>

      <div className="flex items-center space-x-6">
        {/* Menú hamburguesa visible siempre en mobile */}
        <div className="md:hidden relative" ref={mobileMenuRef}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="hover:opacity-80">
            <FiMenu className="text-white text-2xl hover:text-red-500 transition" />
          </button>
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-background border border-muted rounded-xl shadow-lg z-[60] py-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Inicio</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Sobre Nosotros</Link>
              <Link to="/guide" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Guía</Link>
              {!userProfile && !localStorage.getItem("token") && (
                <>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Registrarse</Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Iniciar Sesión</Link>
                </>
              )}
              {userProfile && (
                <>
                  <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">Tienda</Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Iconos de usuario y carrito visibles solo si está logueado */}
        {userProfile && (
          <>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
                <FiUser className="text-white text-2xl hover:text-red-500 transition" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-background shadow-lg rounded-xl py-2 z-50 border border-muted">
                  <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">
                    <Settings size={18} /> Configuración
                  </Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">
                    <History size={18} /> Historial de compras
                  </Link>
                  <Link to="/privacy" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">
                    <FileText size={18} /> Políticas y privacidad
                  </Link>
                  <Link to="/support" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-muted hover:text-gray-500 rounded-md">
                    <HelpCircle size={18} /> ¿Necesitas ayuda?
                  </Link>
                  <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-2 px-4 py-2 hover:bg-muted hover:text-gray-500 w-full text-left rounded-md">
                    <LogOut size={18} /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            <ConfirmModal
              isOpen={isLogoutModalOpen}
              title="Confirmar cierre de sesión"
              message="¿Estás seguro que deseas cerrar sesión?"
              onConfirm={() => {
                logoutUser();
                setIsLogoutModalOpen(false);
                navigate("/");
              }}
              onCancel={() => setIsLogoutModalOpen(false)}
            />

            <button onClick={openCart} className="relative">
              <FiShoppingCart className="text-white text-2xl hover:text-red-500 transition" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
