import React, { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useTeacher from "../../../hooks/useTeacher";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../Components/Container";
import Loader from "../../../Components/Loader";
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const PopularClasses = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
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
      const res = await axiosSecure.get("/popularClasses");
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
      fetch("https://summer-camp-school-server-eosin.vercel.app/selectedClasses", {
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
    <div className="font-medium">
      <Container>
        <h2 className="text-center font-medium text-5xl my-6">
          Popular <span className="text-[#e2554a]">Classes</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls._id} className="card  bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={cls.image}
                  alt="Shoes"
                  className="rounded-xl  h-[208px] w-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{cls.className}</h2>
                <p>Available Seat: {cls.seat}</p>
                <p>Price: ${cls.price}</p>
                <p>Total Student: {cls.totalEnrolled}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularClasses;
