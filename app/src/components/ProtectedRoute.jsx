
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../hooks/UseAuth";
import Loading from "./shared/Loading";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  // Redirect ONLY if loading is false and currentUser is still null
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};


ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
