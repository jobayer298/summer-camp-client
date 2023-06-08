import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    const IsAdmin = true
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden absolute top-0 right-0"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full bg-slate-100 text-base-content text-[17px]">
            {/* Sidebar content here */}
            {/* <div className="text-center">
              <img
                className="w-52 h-52 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <p className="font-medium text-[17px] my-3">{user.displayName}</p>
              <p className="font-medium text-[17px] ">{user.email}</p>
            </div> */}
            <div className="divider"></div>
            {IsAdmin ? (
              <>
                <li className="mt-10">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUsers">All Users</NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    );
};

export default Dashboard;