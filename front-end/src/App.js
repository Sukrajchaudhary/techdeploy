import React, { useEffect ,useState} from "react";
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
import PreLoader from "./Common/PreLoader";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ?<PreLoader/> : <RouterProvider router={router} />}
    </>
  );
}

export default App;