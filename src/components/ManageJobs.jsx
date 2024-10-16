import React, { useEffect, useState } from 'react';
import { db, auth } from './FirebaseConfig'; // Ensure correct Firebase setup
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { sendEmailNotification } from './notificationService'; // For sending emails or notifications to employers
import './ManageJobs.css'; // Custom styles if needed

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch pending jobs from Firestore when the component mounts
  useEffect(() => {
    const fetchPendingJobs = async () => {
      try {
        // Query to get jobs where status is 'pending'
        const q = query(collection(db, 'jobs'), where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);

        // Map through jobs and add them to the job list state
        const jobList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobList);
      } catch (error) {
        console.error('Error fetching jobs: ', error);
      }
    };

    fetchPendingJobs();
  }, []);

  // Function to handle job approval/rejection
  const handleJobApproval = async (jobId, employerId, status) => {
    const jobRef = doc(db, 'jobs', jobId);
    const notificationRef = doc(db, 'notifications', employerId); // Reference to the notifications collection
    console.log('Job ID:', jobId);
    console.log('Employer ID:', employerId);
    console.log('Auth UID:', auth.currentUser.uid);
    try {
      // Update job status in Firestore
      await updateDoc(jobRef, {
        status: status,
      });
  
      // Send notification to employer (email + in-app)
      if (status === 'approved') {
        // 1. Send Email Notification
        sendEmailNotification(employerId, 'Job Approved', 'Your job has been approved!');
  
        // 2. Add an in-app notification
        await updateDoc(notificationRef, {
          notifications: arrayUnion({
            message: `Your job with ID ${jobId} has been approved.`,
            timestamp: new Date(),
            status: 'unread'
          })
        });
      } else if (status === 'rejected') {
        // 1. Send Email Notification
        sendEmailNotification(employerId, 'Job Rejected', 'Your job has been rejected.');
  
        // 2. Add an in-app notification
        await updateDoc(notificationRef, {
          notifications: arrayUnion({
            message: `Your job with ID ${jobId} has been rejected.`,
            timestamp: new Date(),
            status: 'unread'
          })
        });
      }
  
      // Update the UI after the job status has been handled
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error updating job status: ', error);
    }
  };

  return (
    <div className="manage-jobs-container">
      <h2>Manage Jobs</h2>
      {jobs.length === 0 ? (
        <p>No pending jobs at the moment.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <div className="job-actions">
                <button
                  className="approve-btn"
                  onClick={() => handleJobApproval(job.id, job.employerId, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleJobApproval(job.id, job.employerId, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageJobs;
