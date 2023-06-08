import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Container';

const Instructors = () => {
     const [axiosSecure] = useAxiosSecure();
     const {
       data: AllTeachers = [],
       isLoading,
       refetch,
     } = useQuery({
       queryKey: ["users"],
       queryFn: async () => {
         const res = await axiosSecure.get("/users");
         return res.data;
       },
     });
     const teachers = AllTeachers.filter(t => t.role === 'teacher')
     console.log(teachers);
    return (
      <div>
        <Container>
          <h2 className="text-center font-medium text-5xl my-6">
            All <span className="text-[#e2554a]">Teacher</span>
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {teachers.map((teacher) => (
              <div key={teacher._id} className="card  bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={teacher.photo}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{teacher.name}</h2>
                  <p>{teacher.email}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default Instructors;