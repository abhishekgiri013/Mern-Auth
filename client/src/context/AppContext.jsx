import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Validate URL
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getUserData = async () => {
    try {
      const url = `${backendUrl}/api/user/data`;
      if (!isValidURL(url)) throw new Error("Invalid backend URL for user data");

      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const url = `${backendUrl}/api/auth/is-auth`;
      if (!isValidURL(url)) throw new Error("Invalid backend URL for auth check");

      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      console.error("Auth Check Failed:", error);
      toast.error(error.message || "Auth check failed");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
