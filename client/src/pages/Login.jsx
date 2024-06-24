import React, { useState } from "react";
import sideimg from "../assets/sideimglogin.png";
import "../styles/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../security/Auth.jsx";
import {Toaster, toast} from 'react-hot-toast'

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const {storeTokenInLs, setIsAdmin, setUserid} = useAuth()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        alert("Invalid Credentials");
        const errorData = await response.json();
        console.error("Login error:", errorData);
      } else {
        const data = await response.json();
        console.log(data)
        if(data.isAdmin){
          setIsAdmin(true)
          localStorage.setItem("isAdmin", 'true');
        }
        setUserid(data._id)
        localStorage.setItem("userid", data._id.toString());
        console.log("Login successful:", data);
        toast('Login Successfull !!!', {
          icon: '👏'},
          {
            duration: 6000,
          }
        );
        storeTokenInLs(data.token)
        
        setTimeout(() => {
          navigate('/');
        }, 1000);


      }
    } catch (error) {
        console.error("Login request error:", error);
    }

    setUser({ username: "", password: "" });
  };
  return (
    <><Toaster
    position="bottom-left"
    reverseOrder={false}
  />
    <div className="loginContainer">
      <div className="lhs">
        <img className="lhsimg" src={sideimg} alt="" />
      </div>
      <div className="rhs">
        <div className="formcontainer">
          <h1>Login to the Store</h1>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <input
              className="authinputs"
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
            <input
              className="authinputs"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <button className="authbtns" type="submit">
              Login
            </button>
            <p>
              Don't have an account??
              <NavLink className="authtoggler" to="/signup">
                Signup
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div></>
  );
};

export default Login;
