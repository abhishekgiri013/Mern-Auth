import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { userData, isLoggedin } = useContext(AppContent);

  const handleGetStarted = () => {
    if (!isLoggedin) {
      navigate('/login');
    } else if (!userData?.isAccountVerified) {
      navigate('/email-verify');
    } else {
      navigate('/dashboard'); // Or wherever the user should go after getting started
    }
  };

  return (
    <div className="text-center py-12 px-4 bg-gradient-to-b from-white to-purple-50">
      <img
        src="./header_img.png"
        alt="header"
        className="mx-auto w-40 h-auto mb-6"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-4">
        Hey {userData ? userData.name : 'Developer'}!
        <img src="./hand_wave.png" alt="wave" className="w-8 h-8 animate-wiggle" />
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8 text-lg">
        Welcome to our platform — your journey to building modern and scalable web apps begins here. Start exploring, coding, and creating!
      </p>
      <button
        onClick={handleGetStarted}
        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-lg"
      >
        Get Started
        <img src="./arrow_icon.svg" alt="arrow" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Header;
