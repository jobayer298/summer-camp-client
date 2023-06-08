import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container";

const AllClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: AllClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  const classes = AllClasses.filter((c) => c.status === "approved");
  console.log(classes);
  return (
    <div>
      <Container>
        <h2 className="text-center font-medium text-5xl my-6">
          All <span className="text-[#e2554a]">Classes</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>class</th>
                <th>Instructor name</th>
                <th>Available seats</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {classes.map((c, index) => (
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
                  <td><button className="btn btn-xs btn-warning">Select</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
