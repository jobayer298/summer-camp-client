import React from "react";
import useTeacherCart from "../../hooks/useTeacherCart";
import { Link } from "react-router-dom";

const MyClass = () => {
  const [teacherCart] = useTeacherCart();
  console.log(teacherCart);
  return (
    <div>
      <div className="text-center mb-7 border-b-2 ">
        <h2 className="text-center font-medium text-5xl my-6">
          My <span className="text-[#e2554a]">Classes</span>
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
              <th>Class name</th>
              <th>class status</th>
              <th>Total student</th>
              <th>Available seats</th>
              <th>Status</th>
              <th>Feedback</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {teacherCart.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>{c.className}</td>
                <td>{c.status}</td>
                <td>{c.totalEnrolled}</td>
                <td>{c.seat}</td>
                <td>{c.status}</td>
                <td className="text-center">
                  {c.status === "denied" && (
                    <p className="bg-red-500 text-white p-2 rounded-lg">
                      {c.feedback}
                    </p>
                  )}
                </td>
                {/* <td>
                  <Link to={`/dashboard/updateClass/${c._id}`}>
                    <button className="btn btn-secondary btn-xs">Update</button>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
