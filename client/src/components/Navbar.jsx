import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationotp = async () => {
    try {
      axios.defaults.withCredentials = true;

      // Ensure backendUrl ends correctly
      const url = `${backendUrl}/api/auth/send-verify-otp`;

      const { data } = await axios.post(url);

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/email-verify"), 300); // Safe delayed navigation
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const url = `${backendUrl}/api/auth/logout`;
      const { data } = await axios.post(url);

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-20">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src="./logo.svg"
        alt="Logo"
        className="w-28 sm:w-32 cursor-pointer"
      />

      {/* Right side - Avatar or Login Button */}
      {userData ? (
        <div className="relative group">
          <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold cursor-pointer">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-md py-2 w-40">
            <ul>
              {!userData?.isAccountVerified && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={sendVerificationotp}
                >
                  Verify Email
                </li>
              )}
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Login
          <img src="./arrow_icon.svg" alt="arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
