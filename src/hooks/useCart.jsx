import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
const useCart = () => {
  const { user, loading } = useContext(AuthContext);
//   const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [], isLoading } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/selectedClasses?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [cart,isLoading, refetch];
};
export default useCart;
