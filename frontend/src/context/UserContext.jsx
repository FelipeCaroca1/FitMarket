import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { logoutUser } = useContext(AuthContext);

  const getUserProfile = async (token) => {
    try {
      const response = await fetch("https://fitmarket-mjna.onrender.com/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
      } else {
        console.error("Error al obtener el perfil:", data.message);
      }
    } catch (error) {
      console.error("Error en la petición del perfil:", error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        throw new Error("No se encontró el token en localStorage");
      }
      
      const response = await fetch("https://fitmarket-mjna.onrender.com/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setUserProfile((prev) => ({ ...prev, ...updatedData }));
      } else {
        console.error("Error al actualizar perfil:", data.message);
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token en localStorage");
      }
      
      const response = await fetch("https://fitmarket-mjna.onrender.com/api/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setUserProfile(null);
        logoutUser();
      } else {
        console.error("Error al eliminar cuenta");
      }
    } catch (error) {
      console.error("Error en la eliminación de cuenta:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      getUserProfile(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, getUserProfile, updateUserProfile, deleteAccount }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
