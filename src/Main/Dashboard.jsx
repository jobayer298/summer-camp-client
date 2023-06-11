import React, { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useTeacher from '../hooks/useTeacher';
import Hamburger from 'hamburger-react';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [isOpen, setOpen] = useState(false);
    // console.log(user);
    const [isAdmin] = useAdmin()
    const [isTeacher] = useTeacher()
    
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="text-black drawer-button lg:hidden absolute  top-0 right-0"
          >
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full bg-slate-100 text-base-content text-[17px]">
            {/* Sidebar content here */}
            <div className="text-center">
              <img
                className="w-52 h-52 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <p className="font-medium text-[17px] my-3">{user.displayName}</p>
              <p className="font-medium text-[17px] ">{user.email}</p>
            </div>
            <div className="divider"></div>
            {isAdmin && (
              <>
                <li className="mt-10">
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUsers">Manage Users</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageClasses">
                    Manage classes
                  </NavLink>
                </li>
              </>
            )}
            {isTeacher && (
              <>
                <li className="">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/addClass">Add a class</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/myClass">My class</NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isTeacher ? (
              <>
                <li className="mt-10">
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/selectedClass">
                    Selected class
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/enrolledClass">
                    Enrolled class
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/history">
                    Payment history
                  </NavLink>
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