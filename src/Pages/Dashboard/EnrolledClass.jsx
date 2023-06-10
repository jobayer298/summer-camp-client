import Loader from "../../Components/Loader";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EnrolledClass = () => {
  const [cart, isLoading, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure()
  const { data: enrolled = [] } = useQuery({
    queryKey: ["enrolled"],
    queryFn: async () => {
      const res = await axiosSecure.get("/enrolledClass");
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
          Enrolled <span className="text-[#e2554a]">Classes</span>
        </h2>
        <div>
          {/* <Link to="/dashboard/payment">
            <button className="btn btn-sm btn-warning my-3">Pay</button>
          </Link> */}
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table text-[16px]">
          {/* head */}
          <thead>
            <tr className="text-[18px] font-medium">
              <th>#</th>
              <th>class</th>
              <th>Instructor name</th>
              <th>Available seats</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {enrolled.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={c.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{c.className}</div>
                    </div>
                  </div>
                </td>
                <td>{c.instructorName}</td>
                <td>{c.seat}</td>
                <td>${c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClass;
