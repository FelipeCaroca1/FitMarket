import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext); 

  return user ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
