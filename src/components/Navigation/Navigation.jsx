import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navigation.css";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume the user is logged in for now
  const navigate = useNavigate(); // To programmatically navigate

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleLogout = () => {
    // Clear any authentication data (e.g., JWT token) or session
    localStorage.removeItem("userToken"); // Example: remove token from local storage
    setIsLoggedIn(false); // Set the login state to false
    navigate("/"); // Redirect to login page (or any other page)
    console.log("User logged out");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Event-System</h1> 
        </div>
        
        <ul className={`nav-links ${isOpen ? "nav-open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link> 
          </li>
          <li>
            <Link to="/find-events" onClick={() => setIsOpen(false)}>Find Events</Link> 
          </li>
          {/* Conditionally render Logout button */}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          )}
        </ul>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
