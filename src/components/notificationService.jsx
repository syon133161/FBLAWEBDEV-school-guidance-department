import { doc, getDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';
export const sendEmailNotification = async (employerId, subject, message) => {
    try {
      // Assuming you have employer emails stored in Firestore
      const employerRef = doc(db, 'users', employerId);
      const employerDoc = await getDoc(employerRef);
  
      if (employerDoc.exists()) {
        const employerEmail = employerDoc.data().email;
        // Here you could use any email service like SendGrid, Mailgun, or Firebase functions to send emails.
        console.log(`Send email to: ${employerEmail}, Subject: ${subject}, Message: ${message}`);
        // Replace the above log with actual email-sending logic
      } else {
        console.error('No such employer!');
      }
    } catch (error) {
      console.error('Error sending notification: ', error);
    }
  };
  