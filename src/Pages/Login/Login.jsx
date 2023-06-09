import React, { useContext, useState } from "react";
import img from "../../assets/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { saveUser } from "../../api/auth";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false)
  const { googleSignIn } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        saveUser(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Swal.fire("login successful", "success");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="hero py-9 ">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2">
        <div className="text-center ">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <p className="text-red-500"></p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={show ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered  w-full"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute top-4 text-[16px] right-4 cursor-pointer"
                >
                  {show ? <FaEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500">password is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              Already have an account?{" "}
              <Link className="font-bold underline" to="/register">
                register
              </Link>
            </p>
            <div className="divider">Or login with</div>
          </form>
          <div className="text-center mb-5">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-circle btn-primary btn-outline"
            >
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
