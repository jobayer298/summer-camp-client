import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import CountDown from './CountDown/CountDown';
import PopularInstructor from './PopularInstructor/PopularInstructor';
import PopularClasses from './PopularClasses/PopularClasses';
import AOS from "aos";
import "aos/dist/aos.css";


const Home = () => {
    
    //useEffect
    useEffect(() => {
      AOS.init();
    }, []);
    return (
      <div className="relative">
        <Banner></Banner>
        <CountDown></CountDown>
        <PopularClasses></PopularClasses>
        <PopularInstructor></PopularInstructor>
      </div>
    );
};

export default Home;