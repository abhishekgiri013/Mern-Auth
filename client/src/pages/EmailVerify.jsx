import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // 🧭 Link added
import { AppContent } from "../context/AppContext";

const EmailVerify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const { backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;

      // Step 1: Verify OTP
      const verifyRes = await axios.post(`${backendUrl}/api/auth/verify-account`, {
        otp: enteredOtp,
      });

      if (verifyRes.data.success) {
        toast.success(verifyRes.data.message || "Email verified successfully!");

        // Step 2: Get user data
        const authRes = await axios.get(`${backendUrl}/api/auth/is-auth`);
        if (authRes.data.success) {
          setUserData(authRes.data.user);
          setIsLoggedin(true);

          // Step 3: Redirect to homepage
          navigate("/");
        } else {
          toast.error("Verification succeeded but user fetch failed.");
        }
      } else {
        toast.error(verifyRes.data.message || "OTP verification failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const resendRes = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (resendRes.data.success) {
        toast.success(resendRes.data.message || "OTP resent successfully!");
      } else {
        toast.error(resendRes.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md text-center">

        {/* 🖼️ Logo with Home Link */}
        <Link to="/" className="block mb-6">
          <img
            src="/logo.svg" // 🔁 Replace this with your logo file path
            alt="App Logo"
            className="h-12 mx-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Verification</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive the code?{" "}
          <span
            onClick={handleResendOtp}
            className="text-indigo-600 cursor-pointer font-medium hover:underline"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
