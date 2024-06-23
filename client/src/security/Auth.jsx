import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jsonWebToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jsonWebToken"));

  const storeTokenInLs = (serverToken) => {
    setToken(localStorage.getItem("jsonWebToken"));
    setIsLoggedIn(true);
    return localStorage.setItem("jsonWebToken", serverToken);
  };

  const logout = async () => {
    setToken("");
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("logout error:", errorData);
        alert(errorData.error);
      } else {
        const data = await response.json();
        storeTokenInLs(data.token);
        console.log("Logout successful:", data);
        setIsLoggedIn(false);
        return localStorage.removeItem("jsonWebToken");
      }
    } catch (error) {
      console.error("Logout request error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLs, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
