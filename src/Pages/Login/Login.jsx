import React from 'react';
import img from '../../assets/login.png'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
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
              <button className="btn btn-circle btn-primary btn-outline">
                G
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;