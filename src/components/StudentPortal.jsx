import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './StudentPortal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [interestedJobs, setInterestedJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userDoc);
  
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserName(userData.name1);
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No authenticated user found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserName();
  }, [auth, db]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const jobCollection = collection(db, 'jobs');
        const jobSnapshot = await getDocs(jobCollection);
        setJobListings(jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };
    fetchJobListings();
  }, [db]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? jobListings.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === jobListings.length - 1 ? 0 : prevIndex + 1));
  };

  const applyForJob = (jobId) => {
    navigate('/Apply');
  };

  const addToInterestedJobs = (jobId) => {
    setInterestedJobs((prev) => [...prev, jobId]);
  };

  const goToJobListings = () => {
    navigate('/jobs');
  };

  return (
    <div className="portal-container">
      <aside className="sidebar">
        <h2>Welcome, {userName}</h2>
        <ul>
          <li><button onClick={goToJobListings}>Job Listings</button></li>
          <li><a href="/Apply">Apply</a></li>
          <li><a href="#contact">Contact Employer</a></li>
          <li><a href="#interested-jobs">Interested Jobs</a></li>
        </ul>
      </aside>
      
      <main className="main-content">
        <section id="job-listings">
          <h2>Job Listings</h2>
          <div className="job-gallery">
            <button className="chevron chevron-left" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {jobListings.length > 0 && (
              <div className="job-card">
                <h3>{jobListings[currentIndex].title}</h3>
                <p>Location: {jobListings[currentIndex].location}</p>
                <p>Salary: {jobListings[currentIndex].salary}</p>
                <button onClick={() => applyForJob(jobListings[currentIndex].id)}>Apply</button>
                <button onClick={() => addToInterestedJobs(jobListings[currentIndex].id)}>Interested</button>
              </div>
            )}

            <button className="chevron chevron-right" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>
        
        <section id="apply">
          <h2>Apply for a Job</h2>
          {/* Apply form here */}
        </section>
        
        <section id="contact">
          <h2>Contact Employer</h2>
          {/* Contact form or message system here */}
        </section>
        
        <section id="interested-jobs">
          <h2>Interested Jobs</h2>
          <ul>
            {interestedJobs.map(jobId => (
              <li key={jobId}>{jobId}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StudentPortal;
