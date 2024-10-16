import React from 'react';
import { Link } from 'react-router-dom';
import './EmployerPortal.css'; // Styling for the portal
import Notifications from './notification'; // Ensure correct path for the Notifications component
import { auth } from './FirebaseConfig'; // Import authentication to get the logged-in user's ID

const EmployerPortal = () => {
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current employer's user ID

  return (
    <div className="employer-portal">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Welcome, Employer</h2>
        <nav>
          <ul>
            <li><Link to="/employer-post-job">Post a Job</Link></li>
            <li><Link to="/employer-manage-jobs">Manage Jobs</Link></li>
            <li><Link to="/employer-applications">View Applications</Link></li>
            <li><Link to="/employer-profile">Profile</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h1>Employer Portal</h1>
        <p>Here you can manage your job postings and applications.</p>

        {/* Notifications component */}
        <Notifications employerId={userId} />

        {/* Add more sections/components as needed */}
      </main>
    </div>
  );
};

export default EmployerPortal;
