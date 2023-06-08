import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: classes = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/classes");
        return res.data;
      },
    });
    // if(isLoading){
    //     return <p>loading.....</p>
    // }

    const makeApproved = (id) =>{
        fetch(`http://localhost:5000/users/class/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Class is approved`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
    }
    return (
      <div>
        <h1 className="text-center font-medium text-3xl my-4">
          All Classes: {classes.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>class</th>
                <th>Instructor name</th>
                <th>Email</th>
                <th>Available seats</th>
                <th>price</th>
                <th>status</th>
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
                  <td>{c.instructorEmail}</td>
                  <td>{c.seat}</td>
                  <td>${c.price}</td>
                  <td className="grid gap-1">
                    <>
                      {c.status === "approved" ? (
                        "approved"
                      ) : (
                        <button
                          onClick={() => makeApproved(c._id)}
                          className="btn btn-warning btn-xs"
                        >
                          {c.status}
                        </button>
                      )}
                    </>
                    <button className="btn btn-error btn-xs">Deny</button>
                    <button className="btn btn-secondary btn-xs">
                      Feedback
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

export default ManageClasses;