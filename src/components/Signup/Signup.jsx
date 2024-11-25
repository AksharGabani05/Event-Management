// components/Signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify styles
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Store the user's email and password in localStorage (you can hash the password in real-world scenarios)
    const userData = {
      email,
      password,
    };

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", "fake-jwt-token"); // Store a fake token for demonstration purposes

    // Show success toast with custom duration of 1000 milliseconds
    toast.success("Signup successful! ", {
      autoClose: 1000, // Custom duration for the toast
    });

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <ToastContainer /> {/* Toast notifications container */}
    </div>
  );
};

export default Signup;
