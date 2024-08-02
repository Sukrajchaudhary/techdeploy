import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  selectEmployeeIsLoading,
  selectEmployeeError,
  resetMessages,
  selectResetPasswordLink,
  resetPasswordLinkAsync,
} from "../../features/Employee/employeeSlice";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector(selectEmployeeIsLoading);
  const error = useSelector(selectEmployeeError);
  const resetLink = useSelector(selectResetPasswordLink);

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    dispatch(resetPasswordLinkAsync({ email }));
    dispatch(resetMessages());
  };
    return (
    <>

    <section className="p-4">
      <div className="max-w-7xl mx-auto p-4 justify-center items-center py-16">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center items-center gap-2 mx-auto">
            <div className="hover:translate-x-1 transition-all gap-2 flex flex-col justify-center items-center cursor-pointer">
              <h1 className="text-black font-extrabold font-sans tracking-wider text-xl">
                Employee Manager
              </h1>
              <h1 className="text-green-600 font-semibold">
                Forgot Your Password !!
              </h1>
            </div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Email"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Enter your Email *
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                placeholder="Enter your email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
          {error?.error?.message && (
            <p className="mt-4 text-sm text-red-600 text-center">
              {error?.error?.message}
            </p>
          )}
          {resetLink && (
            <p className="mt-4 text-sm text-green-600 text-center">
              {resetLink?.message}
            </p>
          )}
          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Remember your password?{" "}
            <Link
              to="/login"
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

export default ForgetPassword;
