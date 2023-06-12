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
import { motion, useMotionValue, useTransform } from "framer-motion";


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
  const MotionContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.9,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const rotateX = useTransform(y, [-100, 100], [30, -30]);
   const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const classes = AllClasses.filter((c) => c.status === "approved");
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="font-medium my-9">
      <Container>
        <h2 className="text-center font-medium text-5xl my-10">
          Popular <span className="text-[#e2554a]">Classes</span>
        </h2>
        <motion.div
          style={{ perspective: 2000 }}
          variants={MotionContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 MotionContainer"
        >
          {classes.map((cls) => (
            <motion.div
              style={{ x, y, rotateX, rotateY, z: 100 }}
              drag
              dragElastic={0.18}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              whileTap={{ cursor: "grabbing" }}
              variants={item}
              key={cls._id}
              className={` ${cls.seat === 0 ? "bg-red-500" : ""}  card  bg-base-100 shadow-xl item cursor-grab`}
            >
              <figure className="px-10 pt-10">
                <img
                  style={{ x, y, rotateX, rotateY, z: 100000 }}
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
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};

export default PopularClasses;
