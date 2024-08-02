import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { logotAsync,resetMessages,selectLogout} from "../../features/Employee/employeeSlice";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


const ProfileDropdown = ({ employeeInfo }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const profileDropdown = useRef();
  const dispatch=useDispatch();
  const fetchResponse=useSelector(selectLogout);
  console.log(fetchResponse)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileDropdown.current &&
        !profileDropdown.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
const handleLogout=()=>{
  dispatch(logotAsync())
}
useEffect(()=>{
if(fetchResponse?.message){
  toast.success(fetchResponse?.message);
  dispatch(resetMessages())
}
return(()=>{
  dispatch(resetMessages())
})
},[fetchResponse,dispatch])
  return (
    <>
    {fetchResponse?.status && <Navigate to="/" replace={true}/>}
    <div className="flex items-center">
      <div className="flex items-center ms-3">
        <div>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <p
              className="w-10 h-10 rounded-full flex justify-center items-center text-green-600 text-lg font-semibold"
            
            >{employeeInfo?.username?.substring(0, 2).toUpperCase()} </p>
          </button>
        </div>
        {isDropdownOpen && (
          <div
            ref={profileDropdown}
            className="z-50 absolute top-10 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user"
          >
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                {employeeInfo?.username}
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                {employeeInfo?.email}
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
              <button onClick={handleLogout}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Sign Out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProfileDropdown;
