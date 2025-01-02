import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebase'; // Import Firebase authentication
import { onAuthStateChanged } from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

// Hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// AuthProvider component to provide authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
