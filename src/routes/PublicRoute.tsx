import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/home" replace /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
