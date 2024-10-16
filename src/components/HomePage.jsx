import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Importing the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For the chevron icons
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons
import Testimonials from './Testimonials'; // Testimonials component
import UpcomingEvents from './UpcomingEvents'; // Upcoming events component
import Footer from './Footer'; // Footer component
import { db } from './FirebaseConfig'; // Importing Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Importing Firestore methods

const HomePage = () => {
  // State to store job postings fetched from the database
  const [jobs, setJobs] = useState([]);
  // State to track the currently displayed job card's index
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect hook to fetch jobs from Firestore when the component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch the 'jobs' collection from Firestore
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        // Map through the documents and store the data in an array
        const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Limit the number of jobs to 5 for display purposes
        setJobs(jobsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching jobs: ', error); // Log an error if the fetch fails
      }
    };

    fetchJobs(); // Call the function when the component mounts
  }, []); // Empty dependency array to run the effect only once

  // Function to handle the previous button click - cycles back to the last job if at the start
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? jobs.length - 1 : prevIndex - 1
    );
  };

  // Function to handle the next button click - cycles back to the first job if at the end
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === jobs.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Searching for a Job? Look Here!</h1>
            <p>
              Your next opportunity is just a click away. Explore the latest job openings in our school district and take the next step in your career.
            </p>
            <a href="/jobs" className="hero-button">
              View Job Listingss
            </a>
          </div>
        </div>

        {/* SVG for a wave effect to visually separate sections */}
        <svg
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,213.3C672,213,768,203,864,197.3C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Employer Section prompting users to post a job */}
      <section className="employer-section">
        <div className="employer-content">
          <h2>Need more employees? Post your job here!</h2>
          <p>
            School students from ages 15-18 are available. From tech interns to full-time employees, post your job here.
          </p>
          <a href="/post-job" className="employer-button">
            Post a Job
          </a>
        </div>
      </section>

      {/* Job Postings Section */}
      <section className="job-postings-section">
        <h2>Some of the Jobs Available for Students</h2>
        <div className="job-gallery">
          {/* Chevron buttons to navigate job cards */}
          <button className="chevron chevron-left" onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* Display the current job if there are any jobs available */}
          {jobs.length > 0 && (
            <div className="job-card">
              <h3>{jobs[currentIndex].title}</h3>
              <p>Salary: {jobs[currentIndex].salary}</p>
              <p>Location: {jobs[currentIndex].location}</p>
              <a href={jobs[currentIndex].link} className="view-job-button">
                View Job
              </a>
            </div>
          )}

          <button className="chevron chevron-right" onClick={handleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Apply Section encouraging students to apply for jobs */}
      <section className="apply-section">
        <div className="apply-content">
          <h2>Ready to take the next step? Apply Now!</h2>
          <p>
            Students aged 15-18, apply now for exciting opportunities and kickstart your career.
          </p>
          <a href="/apply" className="apply-button">
            Apply Now
          </a>
        </div>
      </section>

      {/* Other components such as testimonials, upcoming events, and the footer */}
      <Testimonials />
      <UpcomingEvents />
      <Footer />
    </main>
  );
};

export default HomePage;
