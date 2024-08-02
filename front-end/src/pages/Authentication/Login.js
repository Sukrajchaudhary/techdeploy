import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [validateError, setValidateError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validate = () => {
    const errorObj = {};
    if (value.email === "") {
      errorObj.email = "Please enter your email";
    }
    if (value.password === "") {
      errorObj.password = "Please enter your password";
    }
    setValidateError(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    setValidateError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setIsLoading(true);
      setValidateError({});
      setData(null);

      try {
        const response = await fetch("http://localhost:8080/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(value),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message || "Login successful");
          localStorage.setItem("accessToken", result?.accessToken);
          setData(result);
        } else {
          toast.error(result.message || "Login failed. Please try again.");
        }
      } catch (err) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {data?.status && <Navigate to="/Dashboard" replace />}
      <section className="p-4">
        <div className="max-w-7xl mx-auto p-4 justify-center items-center py-8">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center items-center gap-2 mx-auto">
              <div className="hover:translate-x-1 transition-all gap-2 flex flex-col justify-center items-center cursor-pointer">
                <h1 className="text-black font-extrabold font-sans tracking-wider text-xl">
                  Employee Manager
                </h1>
                <h1 className="text-green-600 font-semibold">
                  Login to Your Account
                </h1>
              </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={value.email}
                  placeholder="Enter your email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p className="text-red-500 text-sm">{validateError.email}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Password *
                  </label>
                  <Link
                    to="/Forget-Password"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                    placeholder="Enter your password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                  >
                    {passwordVisible ? (
                      <EyeOff size={20} color="#4B5563" />
                    ) : (
                      <Eye size={20} color="#4B5563" />
                    )}
                  </button>
                </div>
                <p className="text-red-500 text-sm">{validateError.password}</p>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center gap-3 items-center px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                  {isLoading && (
                    <LoaderCircle
                      className="animate-spin"
                      size={24}
                      color="#16d312"
                      strokeWidth={3.25}
                    />
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/"
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
