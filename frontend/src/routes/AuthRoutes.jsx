import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRoutes = ({ children }) => {
  const isAuthenticated = false; // Esto se actualizará cuando implementemos autenticación

  return isAuthenticated ? <Navigate to="/" /> : children;
};

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoutes;
