import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isTeacher, isLoading: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log(res);
      return res.data.teacher;
    },
  });
  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
