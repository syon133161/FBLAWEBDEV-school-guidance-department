import React from 'react';
import './HomePage.css';

const events = [
  {
    id: 1,
    title: 'School District Career Fair',
    date: 'October 15, 2024',
    location: 'Central High School',
    description: 'A great opportunity for students to meet employers and learn about various job opportunities.',
  },
  {
    id: 2,
    title: 'Resume Writing Workshop',
    date: 'November 5, 2024',
    location: 'Online Webinar',
    description: 'Learn how to craft a professional resume that stands out to employers.',
  },
  {
    id: 3,
    title: 'Tech Job Expo',
    date: 'December 12, 2024',
    location: 'Tech University',
    description: 'Explore job openings in the tech sector and network with industry professionals.',
  },
  // Add more events as needed
];

const UpcomingEvents = () => {
  return (
    <section className="upcoming-events-section">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
