import React, { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import setPersistence
import { auth, db } from './FirebaseConfig'; // Import Firebase auth and Firestore
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setLoading(true); // Set loading state during the sign-in process

    try {
      // Set Firebase auth persistence so the user remains signed in across sessions
      await setPersistence(auth, browserLocalPersistence); // Use setPersistence here

      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user role from Firestore (Assume roles stored in 'users' collection)
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Redirect based on the user's role
        if (role === 'student') {
          navigate('/student-portal');
        } else if (role === 'employer') {
          navigate('/employer-portal');
        } else if (role === 'admin') {
          navigate('/admin-portal');
        } else {
          setError('User role not found. Please contact support.');
        }
      } else {
        setError('No role assigned to this user. Contact admin.');
      }
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false); // Stop loading after sign-in process
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p>
          Don’t have an account? <a href="/sign-up">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
