import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.webp'

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () =>{
    logout()
    .then(() =>{Swal.fire("Logout successful", "success");}).catch(err =>{
      console.log(err.message);
    })
  }
  console.log(user);
    const menu = (
      <>
        <li>
          <Link>Home</Link>
        </li>
        <li>
          <Link>Instructors</Link>
        </li>
        <li>
          <Link>Classes</Link>
        </li>
        <li>
          <Link>Dashboard</Link>
        </li>
      </>
    );
    return (
      <nav className="bg-base-100 shadow-sm ">
        <div className="navbar  container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              >
                {menu}
              </ul>
            </div>
            <Link>
              <img className="w-[200px]" src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal font-medium text-[17px] px-1">
              {menu}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex gap-2 items-center">
                {user && (
                  <img
                    className="w-11 h-11 rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="btn bg-[#e2554a] text-white border-0  btn-secondary btn-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn bg-[#e2554a] text-white border-0  btn-secondary btn-sm">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
};

export default NavBar;