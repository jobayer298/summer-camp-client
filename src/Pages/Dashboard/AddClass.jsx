import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { imageUpload } from "../../api/imageUpload";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure()
  //   console.log(user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const image = form.image.files[0];
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const seat = parseInt(form.seat.value);
    const price = parseFloat(form.price.value);
    // upload image
    imageUpload(image).then((res) => {
      const classData = {
        className,
        image: res.data.display_url,
        instructorEmail,
        instructorName,
        seat,
        price,
        addedBy : {
            name: user?.displayName,
            email: user?.email 
        }
      };
      axiosSecure.post("/classes", classData).then(data =>{
        console.log(data.data)
        if(data.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "added class successfully",
              showConfirmButton: false,
              timer: 1500,
            });
        }
    })

      console.log(classData);
    });
  };
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-8">Add a class</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-2">
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block text-gray-600">
            Class name
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border  focus:outline-rose-500 rounded-md "
            name="className"
            type="text"
            placeholder="Class name"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block text-gray-600">
            Class image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered  w-full   focus:outline-rose-500"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block text-gray-600">
            Instructor name
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border  focus:outline-rose-500 rounded-md "
            name="instructorName"
            type="text"
            defaultValue={user?.displayName}
            disabled
            placeholder="Instructor name"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block text-gray-600">
            Instructor email
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border  focus:outline-rose-500 rounded-md "
            name="instructorEmail"
            type="email"
            defaultValue={user?.email}
            disabled
            placeholder="Instructor email"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Available seat
            </label>
            <input
              className="w-full px-4 py-3  text-gray-800 border  focus:outline-rose-500 rounded-md "
              name="seat"
              type="number"
              placeholder="Available seat"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Price
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border  focus:outline-rose-500 rounded-md "
              name="price"
              type="number"
              placeholder="Price"
              required
            />
          </div>
        </div>
        <button className="primary-btn btn-block mt-2">Add class</button>
      </form>
    </div>
  );
};

export default AddClass;
