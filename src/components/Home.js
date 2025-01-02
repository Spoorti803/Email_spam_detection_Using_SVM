import React from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook

function Home() {
  const { user } = useAuth(); // Destructure user from useAuth

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4">
      <h1>Welcome, {user.email}</h1> {/* Display user's email */}
      
      <nav className="navbar mb-4">
        <Link to="/home/inbox" className="link">Inbox</Link> | 
        <Link to="/home/sent" className="link">Sent</Link> | 
        <Link to="/home/spam" className="link">Spam</Link> | 
        <Link to="/home/create-mail" className="link">Create Mail</Link>
      </nav>

      <hr />
      <Outlet /> {/* Render nested routes */}
    </div>
  );
}

export default Home;
