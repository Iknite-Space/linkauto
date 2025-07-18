
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../hooks/UseAuth";
import Loading from "./shared/Loading";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useUser();

  if (loading) {
    return <div><Loading /></div>; // Or show a spinner component
  }

  return currentUser ? children : <Navigate to="/"/>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
