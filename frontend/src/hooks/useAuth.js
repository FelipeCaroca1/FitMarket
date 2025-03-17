import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_AUTH = "https://fitmarket-mjna.onrender.com/api/auth";
const API_USER = "https://fitmarket-mjna.onrender.com/api/user";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

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
  }, []);

  const loginUser = useCallback(async (userData) => {
    try {
      const response = await fetch(`${API_AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/shop");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  }, [navigate]);

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      await loginUser({ email: userData.email, password: userData.password });
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    setTimeout(() => window.location.reload(), 100);
  }, [navigate]);

  const deleteAccount = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const response = await fetch(`${API_USER}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la cuenta");
      }

      logoutUser();
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error.message);
    }
  }, [logoutUser]);

  return { user, loginUser, registerUser, logoutUser, deleteAccount };
};

export default useAuth;
