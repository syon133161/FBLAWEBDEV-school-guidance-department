// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs05MM2LbI7wb1OhabZf3f_fhnmjxe08M",
  authDomain: "fcs-school-job-portal.firebaseapp.com",
  projectId: "fcs-school-job-portal",
  storageBucket: "fcs-school-job-portal.appspot.com",
  messagingSenderId: "457415101824",
  appId: "1:457415101824:web:597852a81db43eceb0c565",
  measurementId: "G-XXTSNC5T0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);
const firestore = getFirestore(app); // Ensure this line exists




export { firestore };
export { auth, db }; // Ensure both auth and db are exported
