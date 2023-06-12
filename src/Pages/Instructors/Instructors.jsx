import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Container';
import Loader from '../../Components/Loader';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure()
     const {
       data: teachers = [],
       isLoading,
       refetch,
     } = useQuery({
       queryKey: ["instructors"],
       queryFn: async () => {
         const res = await axiosSecure.get("/instructors");
         return res.data;
       },
     });
     if(isLoading){
      return <Loader></Loader>
     }
    return (
      <div className="py-10">
        <Container>
          <h2 className="text-center font-medium text-5xl my-6">
            All <span className="text-[#e2554a]">Teacher</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <div
                data-aos="flip-left"
                key={teacher._id}
                className="card  bg-base-100 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={teacher.photo}
                    alt="Shoes"
                    className="rounded-xl h-[208px] w-full"
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