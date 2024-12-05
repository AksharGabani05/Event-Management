
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    const storedUser = JSON.parse(localStorage.getItem("user"));

   
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      
      localStorage.setItem("authToken", "fake-jwt-token");

      
      toast.success("Login successful!", {
        autoClose: 1000, 
      });


      setTimeout(() => {
        navigate("/event-list"); 
      }, 2000);
    } else {
      toast.error("Invalid login credentials", {
        autoClose: 1000, 
      }); 
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
      <ToastContainer /> 
    </div>
  );
};

export default Login;
