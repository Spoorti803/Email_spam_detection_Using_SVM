import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; // Import AuthProvider to wrap app
import Home from './components/Home'; // Import the Home component
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup'; // Import the Signup component
import Inbox from './components/Inbox'; // Import the Inbox component
import Sent from './components/Sent'; // Import the Sent component
import Spam from './components/Spam'; // Import the Spam component
import CreateMail from './components/CreateMail'; // Import CreateMail component
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function App() {
  return (
    <AuthProvider> {/* Wrapping app with AuthProvider to provide the user context */}
      <Router>
        <Routes>
          {/* Login and Signup Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Home Route with Nested Routes */}
          <Route path="/home" element={<Home />}>
            <Route path="inbox" element={<Inbox />} />
            <Route path="sent" element={<Sent />} />
            <Route path="spam" element={<Spam />} />
            <Route path="create-mail" element={<CreateMail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
