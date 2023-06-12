import React from 'react';
import img from "../../assets/404.gif";
import { Link } from 'react-router-dom';

const ErroPage = () => {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-4 bg-[#111111d5]'>
        <img className='h-96 w-96 rounded-full shadow-2xl' src={img} alt="" />
        <Link to="/">
          <button className='btn btn-outline btn-success'>Back to home</button>
        </Link>
      </div>
    );
};

export default ErroPage;