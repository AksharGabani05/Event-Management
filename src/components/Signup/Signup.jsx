
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    
    const userData = {
      email,
      password,
    };

    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", "fake-jwt-token"); 

    
    toast.success("Signup successful! ", {
      autoClose: 1000, 
    });

    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
      <a href="">Please First SignUp !</a>
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
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
