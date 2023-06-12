import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import img1 from "../../../assets/Banner/1.jpg";
import img2 from "../../../assets/Banner/2.jpg";
import "./Banner.css";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: ["formative", "experience"],
    loop: 0,
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="banner-overlay absolute w-full h-full inset-0 bg-black bg-opacity-30"></div>
          <img src={img1} alt="" />
          <div className="font-bold text-center w-full absolute top-[30%]">
            <div>
              <p className="text-yellow-600 font-bold text-4xl first-text mb-4">
                Children Summer Camp
              </p>
              <h1 className="font-extrabold text-8xl text-white second-text">
                A chance to provide <br /> <span>{text}</span>{" "}
                <Cursor cursorColor="red" />
              </h1>
              <Link to="/register">
                <button className=" mt-3 primary-btn">
                  Registration for camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-overlay absolute w-full h-full inset-0 bg-black bg-opacity-30"></div>
          <img src={img2} alt="" />
          <div className="font-bold text-center w-full absolute top-[30%]">
            <div>
              <p className="text-yellow-600 font-bold text-4xl first-text mb-4">
                Children Summer Camp
              </p>
              <h1 className="font-extrabold text-8xl text-white second-text">
                A chance to provide <br /> <span>{text}</span>{" "}
                <Cursor cursorColor="red" />
              </h1>
              <Link to="/register">
                <button className="mt-3 primary-btn">
                  Registration for camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
