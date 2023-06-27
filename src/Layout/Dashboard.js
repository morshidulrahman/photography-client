import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useinstructor from "../hooks/useInstructor";
import { FaCcAmazonPay } from "react-icons/fa";
import DashboardFront from "../Pages/Dashboard/DashboardFront";
import { GrFormClose } from "react-icons/gr";
const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [Admin] = useAdmin();
  const [instructor] = useinstructor();
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const location = useLocation();

  return (
    <div>
      <>
        <button
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu size={22} />
        </button>
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  border-r dark:border-r-gray-700 border-gray-300 ${
            sidebarVisible ? "" : "-translate-x-full"
          } sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 relative">
            {sidebarVisible && (
              <div className="absolute right-4" onClick={toggleSidebar}>
                <GrFormClose
                  size={23}
                  className="dark:bg-white rounded-full "
                />
              </div>
            )}
            <ul className="space-y-2 font-medium mt-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>
                    <AiFillHome size={20} />
                  </span>
                  <span className="ml-3">Home</span>
                </Link>
              </li>
              {instructor ? (
                <>
                  <li>
                    <Link
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      to="/dashboard/addclass"
                    >
                      <span>
                        <SiGoogleclassroom size={20} />
                      </span>
                      <span className="ml-3">Add Classes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      to="/dashboard/myclasses"
                    >
                      <span>
                        <SiGoogleclassroom size={20} />
                      </span>
                      <span className="ml-3">My Classes</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {Admin ? (
                    <>
                      <li>
                        <Link
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          to="/dashboard/allusers"
                        >
                          <span>
                            <FaUsers size={20} />
                          </span>
                          <span className="ml-3">All users</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          to="/dashboard/manageclasses"
                        >
                          <SiGoogleclassroom size={20} />
                          <span className="ml-3">Manage Classes</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/dashboard/myselected"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <span>
                            <MdPhotoSizeSelectActual size={20} />
                          </span>
                          <span className="ml-3">Selected Classes</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/paymenthistory"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <span>
                            <FaCcAmazonPay size={20} />
                          </span>
                          <span className="ml-3">Payment History</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          to="/dashboard/enrollclasses"
                        >
                          <span>
                            <SiGoogleclassroom size={20} />
                          </span>
                          <span className="ml-3">Enrolled Classes</span>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </aside>
        <div className={`p-4 sm:ml-64 dark:bg-gray-800 h-screen`}>
          <div className="p-4">
            {location.pathname === "/dashboard" ? (
              <DashboardFront />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
