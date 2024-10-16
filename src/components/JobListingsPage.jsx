import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig'; // Make sure Firebase is configured correctly
import './JobListingsPage.css';

const JobListingsPage = () =>
{
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(9); // Number of jobs per page
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() =>
    {
        const fetchApprovedJobs = async () =>
        {
            try
            {
                const q = query(collection(db, 'jobs'), where('status', '==', 'approved'));
                const querySnapshot = await getDocs(q);
                const jobsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setJobs(jobsArray);
            }
            catch (error)
            {
                console.error('Error fetching jobs: ', error);
            }
        };

        fetchApprovedJobs();
    }, []);

    // Handle search input
    const handleSearch = (e) =>
    {
        setSearchQuery(e.target.value);
    };

    // Get current jobs based on pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs
        .filter((job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.salary.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indexOfFirstJob, indexOfLastJob);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="job-listings-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, location, or salary"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="job-cards">
                {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3>{job.title}</h3>
                            <p>Location: {job.location}</p>
                            <p>Salary: {job.salary}</p>
                            <p>{job.description}</p>
                            <a href={`/jobs/${job.id}`} className="view-job-button">
                                View Job
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No jobs available.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default JobListingsPage;
