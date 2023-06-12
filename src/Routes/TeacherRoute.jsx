import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useTeacher from "../hooks/useTeacher";
import Loader from "../Components/Loader";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isTeacher, isTeacherLoading] = useTeacher();
  const location = useLocation();

  if (loading || isTeacherLoading) {
    return <Loader />;
  }

  if (user && isTeacher) {
    return children; 
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default TeacherRoute;
