import React from 'react';
import Container from '../../../Components/Container';
import './About.css'
import image from "../../../assets/image.jpg";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
    return (
      <div className="py-24 about-bg text-white">
        <Container>
          <div className="grid md:grid-cols-2 place-items-center gap-5">
            <div className="space-y-4">
              <h2 className="font-bold text-4xl">
                Learn to work School{" "}
                <span className="text-orange-500">Activities</span> Good
                Solution of Kids in the world
              </h2>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text.
              </p>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <p className="flex items-center gap-2 bg-white text-black p-4 font-bold text-[19px] rounded-lg border-l-2 border-orange-500">
                    {" "}
                    <FaArrowRight /> Learn to Play
                  </p>
                  <p className="flex items-center gap-2 bg-white text-black p-4 font-bold text-[19px] rounded-lg border-l-2 border-orange-500">
                    {" "}
                    <FaArrowRight /> Learn to Play
                  </p>
                  <p className="flex items-center gap-2 bg-white text-black p-4 font-bold text-[19px] rounded-lg border-l-2 border-orange-500">
                    {" "}
                    <FaArrowRight /> Learn to Play
                  </p>
                  <p className="flex items-center gap-2 bg-white text-black p-4 font-bold text-[19px] rounded-lg border-l-2 border-orange-500">
                    {" "}
                    <FaArrowRight /> Learn to Play
                  </p>
                </div>
              </div>
              <button className=" mt-3 primary-btn">
                About us
              </button>
            </div>
            <div>
              <img className='rounded-lg' src={image} alt="" />
            </div>
          </div>
        </Container>
      </div>
    );
};

export default About;