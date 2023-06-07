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

const Banner = () => {
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
          <div class="banner-overlay absolute w-full h-full inset-0 bg-black bg-opacity-30"></div>
          <img src={img1} alt="" />
          <div className="font-bold text-center w-full absolute top-[30%]">
            <div>
              <p className="text-yellow-600 font-bold text-4xl first-text mb-4">
                Children Summer Camp
              </p>
              <h1 className="font-extrabold text-8xl text-white second-text">
                A chance to provide <br /> formative experience
              </h1>
              <Link to="/register">
                <button className="btn bg-[#e2554a] text-white border-0 mt-3 btn-secondary">
                  Registration for camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="banner-overlay absolute w-full h-full inset-0 bg-black bg-opacity-30"></div>
          <img src={img2} alt="" />
          <div className="font-bold text-center w-full absolute top-[30%]">
            <div>
              <p className="text-yellow-600 font-bold text-4xl first-text mb-4">
                Children Summer Camp
              </p>
              <h1 className="font-extrabold text-8xl text-white second-text">
                A chance to provide <br /> formative experience
              </h1>
              <Link to="/register">
                <button className="btn bg-[#e2554a] text-white border-0 mt-3 btn-secondary">
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
