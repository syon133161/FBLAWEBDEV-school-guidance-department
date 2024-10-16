import React, { useState } from 'react';
import { auth } from './FirebaseConfig.js'; // Adjust the import path as needed
import { db } from './FirebaseConfig'; // Ensure this is your Firestore instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Import Firestore methods
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [phoneNumber, setPhoneNumber] = useState('');
  const [schoolOrBusiness, setSchoolOrBusiness] = useState('');
  const [error, setError] = useState('');
  const [name1, setname1] = useState('');
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Pass `auth` as first argument
      const user = userCredential.user;

      // Add additional user information to Firestore
      await setDoc(doc(db, 'users', user.uid), { // Use `setDoc` to add user data
        email,
        phoneNumber,
        role,
        schoolOrBusiness,
        name1,
      });

      // Redirect based on user role
      if (role === 'student') {
        window.location.href = '/student-portal'; // Update with your routing logic
      } else if (role === 'employer') {
        window.location.href = '/employer-portal'; // Update with your routing logic
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
      <input
          type="text"
          placeholder="Name"
          value={name1}
          onChange={(e) => setname1(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={role === 'student' ? "School Name" : "Business Name"}
          value={schoolOrBusiness}
          onChange={(e) => setSchoolOrBusiness(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
