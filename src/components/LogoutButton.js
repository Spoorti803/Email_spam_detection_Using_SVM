import React from 'react';
import { useAuth } from '../hooks/useAuth';  // Import the useAuth hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const Logout = () => {
  const { logOut } = useAuth(); // Access the logOut function from useAuth
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = async () => {
    await logOut();  // Call the logOut function
    navigate('/');  // Redirect to the login page
  };

  return (
    <div>
      <a
        href="#"
        onClick={handleLogout}  // Call the handleLogout function on click
        style={{
          color: '#007bff',  // Blue color for the link (Bootstrap link color)
          textDecoration: 'none',  // Remove underline
          cursor: 'pointer',  // Change cursor to pointer to indicate it's clickable
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Logout;
