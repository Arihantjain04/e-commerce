import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../security/Auth";
import { Toaster, toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      setIsLoggedOut(true);
      toast.success('Logout Successful !!!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    };

    performLogout();
  }, [logout, navigate]);

  if (!isLoggedOut) {
    return null;
  }

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navigate to="/login" />
    </>
  );
};

export default Logout;
