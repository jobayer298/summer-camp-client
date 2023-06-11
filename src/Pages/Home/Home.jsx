import React from 'react';
import Banner from './Banner/Banner';
import CountDown from './CountDown/CountDown';
import PopularInstructor from './PopularInstructor/PopularInstructor';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CountDown></CountDown>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;