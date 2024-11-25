// components/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify styles
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // For demonstration purposes, assume successful login with hardcoded email and password
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      // Store the fake JWT token in localStorage
      localStorage.setItem("authToken", "fake-jwt-token");

      // Show success toast with custom duration of 1000 milliseconds
      toast.success("Login successful!", {
        autoClose: 1000, // Custom duration for the toast
      });

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/event-list"); // Redirect after 2 seconds
      }, 2000);
    } else {
      toast.error("Invalid login credentials", {
        autoClose: 1000, // Custom duration for the toast
      }); // Show error toast
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/">Signup</a>
        </p>
      </div>
      <ToastContainer /> {/* Toast notifications container */}
    </div>
  );
};

export default Login;
