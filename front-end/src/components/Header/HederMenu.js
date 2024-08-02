import React from "react";
import { Link } from "react-router-dom";
import { CircleDot, Menu, X } from "lucide-react";
import ProfileDropdown from "../Profile/ProfileDropdown";
import { useSelector } from "react-redux";
import {
  selectEmployeeError,
  selectEmployeeIsLoading,
  selectEmployees,
} from "../../features/Employee/employeeSlice";
const HeaderMenu = ({ sidebarOpen, setSidebarOpen }) => {
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const employeeInfo = useSelector(selectEmployees);
  const isEmployeeLoadding = useSelector(selectEmployeeIsLoading);
  const fetchEmployeeError = useSelector(selectEmployeeError);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            {/* Logo */}
            <Link to="/" className="flex justify-center items-center gap-2">
              <div className="hover:translate-x-1 transition-all">
                <CircleDot size={36} color="#267d38" strokeWidth={3} />
              </div>
              <h1 className="text-green-700 font-extrabold font-sans tracking-wider text-xl">
                Employee Managers
              </h1>
            </Link>
          </div>
         {!isEmployeeLoadding &&<ProfileDropdown employeeInfo={employeeInfo}/>}
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu;
