import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async() => {
      const res = await axiosSecure.get("/users")
      return res.data
    }
      
      
  });

  if (isLoading) return "Loading...";
  const makeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsAdmin(true);
        setIsInstructor(false);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `he is admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const makeTeacher = (id) => {
    fetch(`http://localhost:5000/users/teacher/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          setIsInstructor(true);
          setIsAdmin(false);
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `he is teacher now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto w-3/4 mx-auto mt-5">
        <h1 className="my-7 text-center font-medium text-2xl">
          All User: {users.length}
        </h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin Role </th>
              <th>Teacher Role </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      // disabled={isAdmin}
                      onClick={() => makeAdmin(user._d)}
                      className="btn btn-primary btn-sm"
                    >
                      Make admin
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "teacher" ? (
                    "teacher"
                  ) : (
                    <button
                      // disabled={isInstructor}
                      onClick={() => makeTeacher(user._id)}
                      className="btn btn-secondary btn-sm"
                    >
                      Make Teacher
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
