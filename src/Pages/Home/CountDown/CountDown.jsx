import React from 'react';
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import Container from '../../../Components/Container';
import './CountDown.css'
const CountDown = () => {
    return (
      <div className="py-20 text-3xl md:text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-20 countDown">
            <h1 className="font-bold  md:leading-[69px] text-center">
              Don’t Miss the First Day <br /> of Summer Camp!
            </h1>
            <Countdown date={Date.now() + 11000000000} />
          </div>
        </Container>
      </div>
    );
};

export default CountDown;