import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Crear el contexto
const AuthContext = createContext();

// Definir la URL base del backend
const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [setUser]); // 🔥 Agregamos `setUser` para evitar warning de dependencias

  // ✅ Función para iniciar sesión
  const loginUser = useCallback(async (userData) => {
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

      // ✅ Guardar usuario y token en localStorage
      const loggedInUser = data.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", data.token);

      // ✅ Redirigir al perfil después del login
      navigate("/Profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  }, [navigate]); // 🔥 `useCallback` evita recrear la función en cada render

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

      // ✅ Iniciar sesión automáticamente después del registro
      await loginUser({ email: userData.email, password: userData.password });
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  // ✅ Función para cerrar sesión
  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]); // 🔥 `useCallback` evita recrear la función en cada render

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
