import React, { useState } from "react";
import sideimg from "../assets/sideimglogin.png";
import "../styles/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../security/Auth.jsx";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("https://e-commerce-tkjz.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup error:", errorData);
        alert(errorData.error);
      } else {
        const data = await response.json();
        // storeTokenInLs(data.token);
        console.log("Signup successful:", data);
        storeTokenInLs(data.token)
        navigate("/");
      }
    } catch (error) {
      console.error("Signup request error:", error);
    }

    setUser({ username: "", email: "", password: "", fullName: "" });
  };
  return (
    <div className="loginContainer">
      <div className="lhs">
        <img className="lhsimg" src={sideimg} alt="" />
      </div>
      <div className="rhs">
        <div className="formcontainer">
          <h1>Signup to the Store</h1>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <input
              className="authinputs"
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
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
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Email"
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
              Signup
            </button>
            <p>
              Already have an account??
              <NavLink className="authtoggler" to="/login">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
