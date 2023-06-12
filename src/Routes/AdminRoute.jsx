import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Components/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader/>;
  }

  if (user && isAdmin) { 
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
