import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import useTheme from "../../hooks/useThemes";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { AuthContext } from "../../Providers/AuthProviders";
import userlogo from "../../assets/user-icon.png";
import { toast } from "react-toastify";

function Navbar() {
  const [toggle, settoggle] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [Toggle, setToggle] = useState(false);
  const [nextTheme, setTheme] = useTheme();

  const navitems = (
    <>
      <li>
        <Link to="/" className="text-base font-semibold">
          Home
        </Link>
      </li>
      <li>
        <Link to="/allinstructor" className="text-base font-semibold">
          Instructors
        </Link>
      </li>
      <li>
        <Link to="/allclasses" className="text-base font-semibold">
          Classes
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className="text-base font-semibold">
          Dashboard
        </Link>
      </li>
    </>
  );

  const handlelogout = () => {
    logOut();
    setToggle(false);
    toast.success("Logout successfully");
  };
  return (
    <header className="w-full border-b dark:bg-gray-800 dark:text-white bg-white dark:border-b-gray-700">
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <div className="flex space-x-2">
            <Link className="text-3xl font-bold font-heading" to="/">
              Photoghor
            </Link>
          </div>
          <div>
            <ul
              className={` ${
                toggle
                  ? "flex  fixed top-0 right-0 w-48 bg-slate-100 dark:bg-gray-800 h-full flex-col justify-center items-center z-50 gap-2"
                  : "md:flex items-center hidden space-x-5"
              }`}
            >
              {navitems}
              <span
                className="md:hidden absolute top-3 right-[155px] dark:text-white"
                onClick={() => settoggle(false)}
              >
                <GrFormClose
                  size={23}
                  className="dark:bg-white rounded-full "
                />
              </span>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {!user ? (
                <Link to="/login">
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-md ">
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  <img
                    onClick={() => setToggle(!Toggle)}
                    src={user && user.photoURL ? user.photoURL : userlogo}
                    alt="user-logo"
                    className="w-6 h-6 rounded-full object-cover"
                    loading="lazy"
                  />
                </>
              )}

              {Toggle ? (
                <div className="bg-gray-700 px-4 py-2 rounded-md absolute top-11 text-sm font-semibold -left-5 md:left-0 z-50">
                  <div className="flex flex-col gap-1 text-white">
                    <span onClick={handlelogout}>Logout</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="pl-3" onClick={() => setTheme(nextTheme)}>
              {nextTheme === "dark" ? <BsMoonFill /> : <BiSun />}
            </div>
            <span
              className=" md:hidden block dark:text-white"
              onClick={() => settoggle(true)}
            >
              <AiOutlineMenu size={22} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
