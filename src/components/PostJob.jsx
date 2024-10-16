import React, { useState } from 'react';
import { db, auth } from './FirebaseConfig'; // Import Firestore and Auth instances
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './PostJob.css';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handlePostJob = async (e) => {
    e.preventDefault();
    setError('');
  
    const userId = auth.currentUser ? auth.currentUser.uid : null; // Get the current user's UID
  
    if (!userId) {
      setError('You must be logged in to post a job.');
      console.log("User not logged in."); // Log for debugging
      return; // Stop the function if no user is logged in
    }
  
    try {
      // Log the job details being posted
      console.log("Posting job with details:", {
        title,
        description,
        location,
        salary,
        employerId: userId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
  
      // Correctly generate a new job ID and reference
      const jobRef = doc(db, 'jobs', 'job_' + new Date().getTime()); // Creates a unique job ID based on timestamp
  
      // Add the job information to Firestore
      await setDoc(jobRef, {
        title,
        description,
        location,
        salary,
        createdAt: new Date(), // Add a timestamp
        status: 'pending',
        employerId: userId, // Store the employer's UID
      });
  
      // Navigate back to the employer portal after posting
      navigate('/employer-portal');
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error("Error posting job:", err); // Log the error for debugging
    }
  };
  
  return (
    <div className="post-job-page">
      <h2>Post a Job</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handlePostJob}>
        <div className="form-group">
          <label htmlFor="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-description">Job Description</label>
          <textarea
            id="job-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-location">Location</label>
          <input
            type="text"
            id="job-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-salary">Salary</label>
          <input
            type="number"
            id="job-salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="post-job-btn">Post Job</button>
        <button type="button" className="back-btn" onClick={() => navigate('/employer-portal')}>Back</button>
      </form>
    </div>
  );
};

export default PostJob;
