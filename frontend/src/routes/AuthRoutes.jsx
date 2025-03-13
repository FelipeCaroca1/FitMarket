import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types";

const AuthRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/shop" /> : children;
};

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoutes;
