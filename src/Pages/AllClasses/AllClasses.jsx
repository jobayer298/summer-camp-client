import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container";
import Loader from "../../Components/Loader";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useTeacher from "../../hooks/useTeacher";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const AllClasses = () => {
  const [cart, , cartRefetch] = useCart();
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher()
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
  const handleSelect = (data) => {
    if (user && user.email) {
      const classData = {
        email: user?.email,
        classID: data._id, 
        className: data.className,
        image: data.image,
        instructorName: data.instructorName,
        seat: data.seat,
        price: data.price,
        totalEnrolled: data.totalEnrolled,
      };
      fetch("http://localhost:5000/selectedClasses", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            cartRefetch()
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class selected successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="py-10">
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
                  <td>
                    <button
                      disabled={
                        c.seat === 0 ||
                        isAdmin ||
                        isTeacher ||
                        cart.find((item) => item.classID === c._id)
                      }
                      onClick={() => handleSelect(c)}
                      className="btn btn-xs btn-warning"
                    >
                      Select
                    </button>
                  </td>
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
