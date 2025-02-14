import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Crear el contexto
const AuthContext = createContext();

// Definir la URL base del backend
const API_URL = "http://localhost:5000/api/auth"; // 🔥 Ruta corregida

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Cargar datos de usuario si ya estaba autenticado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user"); // 🔥 Evita datos corruptos en localStorage
        }
      } catch {
        localStorage.removeItem("user"); // 🔥 Limpia localStorage si hay error de formato
      }
    }
  }, []);

  // ✅ Función para registrar un usuario
  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();

      // Guardar el usuario en el contexto y localStorage
      const newUser = { name: data.name, email: data.email };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      // ✅ Redirigir al perfil después del registro
      navigate("/Profile");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  // ✅ Función para iniciar sesión
  const loginUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();

      // Guardar el usuario en el contexto y localStorage
      const loggedInUser = { name: data.name, email: data.email };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // ✅ Redirigir al perfil después del login
      navigate("/Profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  // ✅ Función para cerrar sesión
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // ✅ Redirigir a Login al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
