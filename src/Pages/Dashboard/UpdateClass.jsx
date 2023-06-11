import React from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UpdateClass = () => {
    const { id } = useParams();
     const [axiosSecure] = useAxiosSecure();
     const { data={}} = useQuery({
       queryKey: ["history"],
       queryFn: async () => {
         const res = await axiosSecure.get(`/singleClass/${id}`);
         console.log(data);
         return res.data;
       },
     });
    const update = (event) => {
      event.preventDefault();
      const className = event.target.className.value;
      const totalStudent = parseFloat(event.target.totalStudent.value);
      const totalSeat = parseFloat(event.target.totalSeat.value);

      const classData = {className, totalStudent, totalSeat}
      console.log(classData);
        
      fetch(`http://localhost:5000/updateClass/${id}`, {
        method: "patch",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ classData }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Class updated successfully");
          console.log(data);
        });
      
    };
    return (
      <div className="w-1/2 mx-auto ">
        <h2 className="text-center font-medium text-5xl mt-10">
          Update <span className="text-[#e2554a]">class</span>
        </h2>
        <form onSubmit={update} className="mt-5">
          <label>class name</label>
          <input
            type="text"
            defaultValue={data.className}
            placeholder="class name"
            name="className"
            className="input input-bordered input-secondary w-full mt-3"
            required
          />
          <label>Total Seat</label>
          <input
            type="number"
            name="totalStudent"
            defaultValue={data.seat}
            placeholder="total student"
            className="input input-bordered input-secondary w-full mt-3"
            required
          />

          <label>Total student</label>
          <input
            type="number"
            name="totalSeat"
            defaultValue={data.totalEnrolled}
            placeholder="total seat"
            className="input input-bordered input-secondary w-full mt-3"
            required
          />

          <button className="btn btn-secondary mt-3 ">Update</button>
        </form>
      </div>
    );
};

export default UpdateClass;