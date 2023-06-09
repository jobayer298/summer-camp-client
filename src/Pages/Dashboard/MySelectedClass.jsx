import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import { FaTrash } from "react-icons/fa";

const MySelectedClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: selectedClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["selectedClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/selectedClasses");
      return res.data;
    },
  });

  const total = selectedClasses.reduce((acc, curr)=> acc + curr.price ,0)
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="text-center mb-7 border-b-2 ">
        <h2 className="text-center font-medium text-5xl my-6">
          Selected <span className="text-[#e2554a]">Classes</span>
        </h2>
        <p className="text-2xl font-medium">Total Cost: ${total.toFixed(2)}</p>
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
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {selectedClasses.map((c, index) => (
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
                <td>
                  <button className="btn btn-sm btn-warning">Pay</button>
                </td>
                <td>
                  <button className="btn btn-sm bg-white text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
