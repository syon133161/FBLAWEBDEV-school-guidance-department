import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './FirebaseConfig'; // Import your Firebase configuration
import { getDocs, collection } from 'firebase/firestore';
import './apply.css'; // Styling 

const Apply = () => {
    const [jobTitles, setJobTitles] = useState([]); // State for storing job titles

    useEffect(() => {
        const fetchJobTitles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'jobs'));
                const titles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().title // Assuming the job title field in Firestore is called 'title'
                }));
                setJobTitles(titles);
            } catch (error) {
                console.error('Error fetching job titles:', error);
            }
        };

        fetchJobTitles();
    }, []);

    return (
        <div className="container">
            <form>
                <h1>Apply Today!</h1>
                <label htmlFor='firstname'>First Name</label>
                <input type="text" placeholder='Enter your first name' />

                <label htmlFor='middlename'>Middle Name</label>
                <input type="text" placeholder='Enter your middle name' />

                <label htmlFor='lastname'>Last Name</label>
                <input type="text" placeholder='Enter your last name' />

                <label htmlFor='email'>Email</label>
                <input type="email" placeholder='Enter your email' />

                <label htmlFor='phonenumber'>Phone Number</label>
                <input type="text" placeholder='Enter your phone number' />

                <label htmlFor='jobtitle'>Job Title</label>
                <select id="jobtitle" name="jobtitle">
                    {jobTitles.map(job => (
                        <option key={job.id} value={job.name}>{job.name}</option>
                    ))}
                </select>

                <button type="submit">Submit Application</button>
                <button><Link to="/student-portal">Back</Link></button>
            </form>
        </div>
    );
};

export default Apply;
