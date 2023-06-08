import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/users").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  const makeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`,{
      method: "PATCH"
    }).then(res => res.json()).then(data =>{
      console.log(data);
      if(data.modifiedCount){
        refetch()
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: `${user?.name} is admin now!`,
         showConfirmButton: false,
         timer: 1500,
       });
      }
    })
  };
  const makeTeacher = (user) => {
    fetch(`http://localhost:5000/users/teacher/${user._id}`,{
      method: "PATCH"
    }).then(res => res.json()).then(data =>{
      console.log(data);
      if(data.modifiedCount){
        refetch()
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: `${user?.name} is teacher now!`,
         showConfirmButton: false,
         timer: 1500,
       });
      }
    })
  };
  return (
    <div>
      <div className="overflow-x-auto w-3/4 mx-auto mt-20">
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
                      onClick={() => makeAdmin(user)}
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
                      onClick={() => makeTeacher(user)}
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
