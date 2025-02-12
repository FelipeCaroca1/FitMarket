import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Función para registrar un usuario
  const registerUser = (userData) => {
    setUser(userData);
    setIsRegistered(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isRegistered", "true"); // Guardamos estado en localStorage
  };

  // Función para iniciar sesión
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  // Cargar datos de usuario si ya estaba registrado o autenticado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedIsRegistered = localStorage.getItem("isRegistered") === "true";

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsRegistered(storedIsRegistered);
      setIsAuthenticated(storedIsAuthenticated);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isRegistered, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Validación de PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
