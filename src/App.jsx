import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import './index.css'; // Global styles
import SignUp from './components/SignUp';
import JobListingsPage from './components/JobListingsPage';
import PostJob from './components/PostJob'; // <-- Import PostJob Component
import StudentPortal from './components/StudentPortal';
import EmployerPortal from './components/EmployerPortal';
import AdminPortal from './components/AdminPortal';
import SignIn from './components/SignIn';
import { auth } from './components/FirebaseConfig.js'; // Adjust this import according to your setup
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { db } from './components/FirebaseConfig.js';
import ManageJobs from './components/ManageJobs.jsx';
import ManageUsers from './components/ManageUsers.jsx';
import Apply from './components/apply.jsx';

const App = () => {
  const [user, setUser] = useState(null); // State for user
  const [userRole, setUserRole] = useState(null); // State for user role
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for auth

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Fetch the user role from Firestore
        getUserRole(user.uid).then((role) => {
          setUser(user);
          setUserRole(role);
          setIsAuthenticated(true); // Set auth state to true if user is signed in
        });
      } else {
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false); // Set auth state to false if user is signed out
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  // Function to fetch user role from Firestore
  const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data().role : null;
  };

  return (
    <Router>
      {/* Conditionally render the navbar based on the current path */}
      <ConditionalNavbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/jobs" element={<JobListingsPage />} />
        <Route path="/employer-post-job" element={<PostJob />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/employer-portal" element={<EmployerPortal />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/admin-manage-users" element={<ManageUsers />} />
        <Route path="/admin-manage-jobs" element={<ManageJobs />} />
        <Route path="/Apply" element={<Apply />} />
      </Routes>
    </Router>
  );
};

// Updated Component to conditionally render the Navbar based on the current path
const ConditionalNavbar = ({ isAuthenticated }) => {
  const location = useLocation(); // Get the current location
  const portalRoutes = [
    '/student-portal', 
    '/employer-portal', 
    '/admin-portal', 
    '/employer-post-job',
    '/admin-manage-users',
    '/admin-manage-jobs',
    '/jobs',
    '/Apply'
  ];

  // Render Navbar only if the current path is not a portal route
  return !portalRoutes.includes(location.pathname) ? <Navbar /> : null;
};

export default App;
