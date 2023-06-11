import React from 'react';
import Banner from './Banner/Banner';
import CountDown from './CountDown/CountDown';
import PopularInstructor from './PopularInstructor/PopularInstructor';
import PopularClasses from './PopularClasses/PopularClasses';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CountDown></CountDown>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;