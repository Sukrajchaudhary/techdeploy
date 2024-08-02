import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { setNewPasswordAsync,selectEmployeeIsLoading,selectEmployeeError,selectResetPasswordStatus, resetMessages} from '../../features/Employee/employeeSlice';
import toast from "react-hot-toast"
import { Circle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const isLoadding= useSelector(selectEmployeeIsLoading);
  const fetchError=useSelector(selectEmployeeError);
  const fetchmessage= useSelector(selectResetPasswordStatus);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = decodeURIComponent(params.get('email'));
    const tokenParam = decodeURIComponent(params.get('resetPasswordToken'));
    setEmail(emailParam);
    setResetPasswordToken(tokenParam);
  }, []);
  const validate = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setError('');
    dispatch(setNewPasswordAsync({ email, resetPasswordToken, newPassword: password }));
  };
// 
useEffect(()=>{
if(fetchmessage?.message){
  toast.success(fetchmessage?.message);
  dispatch(resetMessages())
}
if(fetchmessage?.message){
  toast.success(fetchmessage?.message);
  dispatch(resetMessages())
}

return(()=>{
  dispatch(resetMessages())
})
},[fetchError,fetchmessage])
  return (
  <>
    {fetchmessage?.message&& (<Navigate to="/Login"/>)}
    <section className="p-4">
      <div className="max-w-7xl mx-auto p-4 justify-center items-center py-16">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center items-center gap-2 mx-auto">
            <div className="hover:translate-x-1 transition-all gap-2 flex flex-col justify-center items-center cursor-pointer">
              <h1 className="text-black font-extrabold font-sans tracking-wider text-xl">
                Employee Manager
              </h1>
              <h1 className="text-green-600 font-semibold">
                Reset Your Password
              </h1>
            </div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Enter New Password *
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoadding}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {isLoadding ?"Loadding .....":" Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </>
  );
};

export default ResetPassword;
