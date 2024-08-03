import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import useSignupContext from "../../hooks/useSignupContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [validationError, setValidationError] = useState({});
  const { loading, data, error, signup, setErrors } = useSignupContext();

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Validation function
  const validate = ({ username, email, password, confirmPassword }) => {
    const errorObj = {};

    if (!username) {
      errorObj.username = "Please Enter Your Username";
    }
    if (username.length <= 4) {
      errorObj.username = "Username must be greate than 4 characters";
    }

    if (!email) {
      errorObj.email = "Please Enter your Email";
    } else {
      const emailRegx =/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegx.test(email)) {
        errorObj.email = "Please enter a valid email address";
      }
    }

    if (!password) {
      errorObj.password = "Please Enter your password";
    } else {
      const passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegx.test(password)) {
        errorObj.password =
          "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character";
      }
    }

    if (confirmPassword !== password) {
      errorObj.confirmPassword = "Password and Confirm password don't match";
    }

    setValidationError(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => {
      const newValue = { ...prevValue, [name]: value };
      return newValue;
    });
    setValidationError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(value);
    if (isValid) {
      signup(value);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setErrors("");
    }
    if (data) {
      toast.success(data?.message);
      setErrors("");
    }
    return () => {
      setErrors("");
    };
  }, [error, data]);

  return (
    <>
      {data?.status && <Navigate to="/Login" />}
      <section className="p-4">
        <div className="max-w-7xl mx-auto p-4 justify-center items-center py-8">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center items-center gap-2 mx-auto">
              <div className="hover:translate-x-1 transition-all gap-2 flex flex-col justify-center items-center cursor-pointer">
                <h1 className="text-black font-extrabold font-sans tracking-wider text-xl">
                  Employee Manager
                </h1>
                <h1 className="text-green-600 font-semibold">
                  Sign Up for Your Account
                </h1>
              </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={value.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p className="text-red-500 text-sm">
                  {validationError.username}
                </p>
              </div>
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
                  value={value.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p className="text-red-500 text-sm">{validationError.email}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={value.password}
                    onChange={handleChange}
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
                <p className="text-red-500 text-sm">
                  {validationError.password}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Confirm Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={value.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff size={20} color="#4B5563" />
                    ) : (
                      <Eye size={20} color="#4B5563" />
                    )}
                  </button>
                </div>
                <p className="text-red-500 text-sm">
                  {validationError.confirmPassword}
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center gap-3 items-center px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign Up
                  {loading && (
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
              Already have an account?{" "}
              <Link
                to="/Login"
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
