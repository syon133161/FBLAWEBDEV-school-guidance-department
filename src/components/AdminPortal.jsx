import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPortal.css'; // Import your CSS file for styling

const AdminPortal = () => {
  return (
    <div className="admin-portal">
      <Sidebar />
      <div className="admin-portal-content">
        <h1>Admin Portal</h1>
        <p>Manage users and job postings here.</p>
        {/* Add more admin functionalities here */}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li><Link to="/admin-portal">Dashboard</Link></li>
        <li><Link to="/admin-manage-users">Manage Users</Link></li>
        <li><Link to="/admin-manage-jobs">Manage Jobs</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default AdminPortal;
