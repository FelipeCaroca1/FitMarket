import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtiene el usuario autenticado

  return user ? children : <Navigate to="/login" />; // Si hay usuario, muestra la página, si no, redirige a login
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
