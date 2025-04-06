import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, setIsLoggedin , getUserData} = useContext(AppContent);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      axios.defaults.withCredentials = true;

      let response;
      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password
        });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password
        });
      }

      if (response.data.success) {
        setIsLoggedin(true);
        getUserData()
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center px-4">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src="./logo.svg"
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          {state === 'Sign Up' ? 'Create Account' : 'Login to your account!'}
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          {state === 'Sign Up'
            ? 'Create your account to get started.'
            : 'Welcome back! Please login to continue.'}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
          {state === 'Sign Up' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Forgot Password */}
          {state === 'Login' && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-purple-600 hover:underline"
                onClick={() => navigate('/reset-password')}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="bg-purple-600 text-white mt-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle State */}
        <div className="mt-6 text-sm text-gray-600">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <button
                className="text-purple-600 font-medium hover:underline"
                onClick={() => setState('Login')}
              >
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{' '}
              <button
                className="text-purple-600 font-medium hover:underline"
                onClick={() => setState('Sign Up')}
              >
                Sign up here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
