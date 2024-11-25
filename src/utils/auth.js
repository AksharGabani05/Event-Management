// utils/auth.js

export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token); // Store the token in localStorage
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Retrieve the token from localStorage
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken(); // Returns true if a token exists, false otherwise
  };
  