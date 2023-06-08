import React from "react";

const AddClass = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const image = form.image.value
    const instructorName = form.instructorName.value 
    const instructorEmail = form.instructorEmail.value; 
    const seat = parseInt(form.seat.value); 
    const price = parseFloat(form.price.value); 
    const data = {className, image, instructorEmail, instructorName, seat,  price}
    console.log(data);
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
