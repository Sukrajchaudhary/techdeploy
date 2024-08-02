import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  selectPasswordUpdate,
  updatePasswordAsync,
  selectEmployeeIsLoading,
  selectEmployeeError,
  resetMessages,
} from "../../features/Employee/employeeSlice";

const EmployeeSetting = () => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const isLoading = useSelector(selectEmployeeIsLoading);
  const fetchResponse = useSelector(selectPasswordUpdate);
  const fetchError = useSelector(selectEmployeeError);
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleToggleVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validate = (formValues) => {
    let errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!formValues.oldPassword) {
      errors.oldPassword = "Old password is required";
    }
    if (!formValues.newPassword) {
      errors.newPassword = "New password is required";
    } else if (!passwordRegex.test(formValues.newPassword)) {
      errors.newPassword =
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character";
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formValues.confirmPassword !== formValues.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      dispatch(updatePasswordAsync(formValues));
      setFormValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }); 
    }
  };

  useEffect(() => {
    if (fetchError?.error?.message) {
      toast.error(fetchError?.error?.message);
      dispatch(resetMessages()); 
    }
    if (fetchResponse?.message) {
      toast.success(fetchResponse?.message);
      dispatch(resetMessages()); 
    }
    return () => {
      dispatch(resetMessages()); 
    };
  }, [fetchError, fetchResponse, dispatch]);
  return (
    <section className="h-full bg-main">
      <h6 className="font-bold sm:text-2xl text-xl">Settings</h6>
      <div className="mt-8 flex sm:flex-row flex-col gap-8 max-w-[500px]">
        <form
          className="flex-1 rounded-lg border border-gray-200 bg-white p-6"
          onSubmit={handleSubmit}
        >
          <p className="mb-4 text-t-lg font-medium">Change your Password</p>
          <div className="flex flex-col gap-4">
            {/* Old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-t-md text-brand-black mb-2"
              >
                Old Password<span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  className={`block w-full border p-3 text-brand-black focus:outline-none rounded-lg ${
                    formErrors.oldPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  placeholder="Enter your old password"
                  type={passwordVisibility.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formValues.oldPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-1 top-2.5 flex h-8 w-10 items-center justify-center rounded-md border-gray-300 hover:border-gray-400"
                  onClick={() => handleToggleVisibility("oldPassword")}
                >
                  {passwordVisibility.oldPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-300" />
                  )}
                </button>
                {formErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.oldPassword}
                  </p>
                )}
              </div>
            </div>
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-t-md text-brand-black mb-2"
              >
                New Password<span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  className={`block w-full border p-3 text-brand-black focus:outline-none rounded-lg ${
                    formErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  placeholder="Enter your new password"
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formValues.newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-1 top-2.5 flex h-8 w-10 items-center justify-center rounded-md border-gray-300 hover:border-gray-400"
                  onClick={() => handleToggleVisibility("newPassword")}
                >
                  {passwordVisibility.newPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-300" />
                  )}
                </button>
                {formErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.newPassword}
                  </p>
                )}
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-t-md text-brand-black mb-2"
              >
                Confirm Password<span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  className={`block w-full border p-3 text-brand-black focus:outline-none rounded-lg ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  placeholder="Confirm your password"
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-1 top-2.5 flex h-8 w-10 items-center justify-center rounded-md border-gray-300 hover:border-gray-400"
                  onClick={() => handleToggleVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-300" />
                  )}
                </button>
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="inline-flex items-center justify-center font-bold rounded-lg text-sm ring-offset-background duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 hover:shadow-lg h-10 px-5 py-5 mt-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin mr-2" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployeeSetting;
