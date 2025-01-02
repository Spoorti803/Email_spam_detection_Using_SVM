
import React from 'react';  // Import React
//import ReactDOM from 'react-dom';  // Import ReactDOM for rendering
import './index.css';  // Import global styles
import App from './App';  // Import the App component, which is the root component of the app
import reportWebVitals from './reportWebVitals';  // Import web vitals for performance measurement
import { createRoot } from 'react-dom/client';  // Import createRoot for React 18+ root rendering

// Create the root element and render the App component inside it
const root = createRoot(document.getElementById('root'));  // Get the root div where the app will be rendered
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);

// Measure web vitals for performance analytics
reportWebVitals();

