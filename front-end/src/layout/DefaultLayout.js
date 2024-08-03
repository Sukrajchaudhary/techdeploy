import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/Sidebar/SidebarMenu";
import HederMenu from "../components/Header/HederMenu";
import { useDispatch} from "react-redux";
import {
 
  getEmployeeInfoAsync,
  getAllEmployeeAsync

} from "../features/Employee/employeeSlice";
const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
// fetch All userinformation nad all Employee
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeInfoAsync())
    dispatch(getAllEmployeeAsync())
  }, [dispatch]);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SidebarMenu
   
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HederMenu
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="p-4 sm:ml-64">
              <div className="mt-14 p-4">{children}</div>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
