import Loader from "../../Components/Loader";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const History = () => {
  const [cart, isLoading, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const { data: history = [] } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/history");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="text-center mb-7 border-b-2 ">
        <h2 className="text-center font-medium text-5xl my-6">
          Payment <span className="text-[#e2554a]">History</span>
        </h2>
        <div></div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table text-[16px]">
          {/* head */}
          <thead>
            <tr className="text-[18px] font-medium">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class Name</th>
              <th>Transaction ID</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {history.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>{c.userName}</td>
                <td>{c.userEmail}</td>
                <td>{c.className}</td>
                <td>{c.transactionID}</td>
                <td>${c.price}</td>
                <td>${c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
