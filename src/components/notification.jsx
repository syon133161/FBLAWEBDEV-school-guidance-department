import React, { useEffect, useState } from 'react';
import { db } from './FirebaseConfig'; // Firebase config
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions

const Notifications = ({ employerId }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications for the employer
  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationRef = doc(db, 'notifications', employerId);
      const notificationSnapshot = await getDoc(notificationRef);

      if (notificationSnapshot.exists()) {
        setNotifications(notificationSnapshot.data().notifications);
      }
    };

    fetchNotifications();
  }, [employerId]);

  // Mark notification as read
  const markAsRead = async (index) => {
    const notificationRef = doc(db, 'notifications', employerId);
    const updatedNotifications = notifications.map((notification, idx) => {
      if (idx === index) {
        return { ...notification, status: 'read' };
      }
      return notification;
    });

    // Update Firestore with the new notification status
    await updateDoc(notificationRef, { notifications: updatedNotifications });
    setNotifications(updatedNotifications); // Update local state
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className={notification.status === 'unread' ? 'unread' : 'read'}>
              {notification.message}
              <br />
              <small>{new Date(notification.timestamp.toDate()).toLocaleString()}</small>
              {notification.status === 'unread' && (
                <button onClick={() => markAsRead(index)}>Mark as read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
