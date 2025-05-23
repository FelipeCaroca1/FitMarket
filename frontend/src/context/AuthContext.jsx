import { createContext, useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();
const API_AUTH = "https://fitmarket-mjna.onrender.com/api/auth";
const API_USER = "https://fitmarket-mjna.onrender.com/api/user";

export const AuthProvider = ({ children }) => {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      const loggedInUser = data.user;

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/shop");
      }, 100);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  }, [navigate]);

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name.trim(),
          email: userData.email.trim(),
          password: userData.password,
        }),
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

    setTimeout(() => {
      window.location.reload();
    }, 100);

    navigate("/");
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

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

