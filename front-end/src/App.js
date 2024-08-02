import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard";
import ViewEmployee from "./components/Employee/ViewEmployee";
import DefaultLayout from "./layout/DefaultLayout";
import EmployeeSetting from "./components/Employee/EmployeeSetting";
import ProtectedRoutes from "./pages/Authentication/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Forget-Password",
    element: <ForgetPassword />,
  },
  {
    path: "/Reset-Password",
    element: <ResetPassword />,
  },
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoutes>
        <EmployeeDashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/View-info",
    element: (
      <ProtectedRoutes>
      <DefaultLayout>
      
          <ViewEmployee />
      
      </DefaultLayout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/setting",
    element: (
      <ProtectedRoutes>
      <DefaultLayout>
       
          <EmployeeSetting />
      
      </DefaultLayout>
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
