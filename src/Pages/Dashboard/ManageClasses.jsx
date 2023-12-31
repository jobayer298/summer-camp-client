import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';

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
    if(isLoading){
        return <Loader></Loader>
    }

    const makeApproved = (id) =>{
        fetch(`https://summer-camp-school-server-eosin.vercel.app/users/class/${id}`, {
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
    const makeDenied = (id) =>{
        fetch(`https://summer-camp-school-server-eosin.vercel.app/users/class/deny/${id}`, {
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
                title: `Class is denied`,
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
                        <button
                          disabled={
                            c.status === "approved" || c.status === "denied"
                          }
                          className="btn btn-success btn-xs"
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          disabled={
                            c.status === "approved" || c.status === "denied"
                          }
                          onClick={() => makeApproved(c._id)}
                          className="btn btn-warning btn-xs"
                        >
                          pending
                        </button>
                      )}
                    </>
                    <>
                      {c.status === "denied" ? (
                        <button
                          disabled={
                            c.status === "approved" || c.status === "denied"
                          }
                          className="btn btn-success btn-xs"
                        >
                          Denied
                        </button>
                      ) : (
                        <button
                          disabled={
                            c.status === "approved" || c.status === "denied"
                          }
                          onClick={() => makeDenied(c._id)}
                          className="btn btn-error btn-xs"
                        >
                          Deny
                        </button>
                      )}
                    </>

                    <Link to={`/dashboard/feedback/${c._id}`}>
                      <button className="btn btn-secondary btn-xs">
                        Feedback
                      </button>
                    </Link>
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