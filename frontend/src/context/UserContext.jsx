import { createContext, useState, } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const getUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
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

  const updateUserProfile = async (updatedData, token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile((prev) => ({ ...prev, ...updatedData })); // Actualiza el estado
      } else {
        console.error("Error al actualizar perfil:", data.message);
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, getUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Validación de props con PropTypes
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
