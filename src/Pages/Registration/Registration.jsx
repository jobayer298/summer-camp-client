import React, { useContext } from "react";
import img from "../../assets/login.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
    .then(result =>{
        console.log(result.user);
        updateUserProfile(data.name, data.url)
          .then(() => {
            Swal.fire("Registration successful", "success");
          })
          .catch((err) => {
            console.log(err.message);
          });
    })
    .catch(err =>{
        console.log(err.message);
    })
};
  return (
    <div className="hero py-9 ">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2">
        <div className="text-center ">
          <img className="" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <p className="text-red-500"></p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="name"
                placeholder="name"
                name="name"
                className="input input-bordered"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">name is required</p>
              )}
            </div>
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                })}
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password Must be greater than 6 character
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password Must be less than 20 character
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  at least one letter and one number and one special characters
                </p>
              )}
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                })}
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password Must be greater than 6 character
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password Must be less than 20 character
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  at least one letter and one number and one special characters
                </p>
              )}
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("url", { required: true })}
                type="url"
                placeholder=" Photo url"
                name="url"
                className="input input-bordered"
              />
              {errors.url?.type === "required" && (
                <p className="text-red-500">PhotoURL is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <p>
              Already have an account?{" "}
              <Link className="font-bold underline" to="/login">
                login
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

export default Registration;
