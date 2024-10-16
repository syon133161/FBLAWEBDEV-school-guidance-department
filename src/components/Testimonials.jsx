import React from 'react';
import './HomePage.css';

const testimonials = [
  {
    name: "John Doe",
    role: "Student",
    image: "https://via.placeholder.com/300", // Replace with actual image path
    text: "This platform helped me land my first internship. It was an amazing experience!",
  },
  {
    name: "Jane Smith",
    role: "Employer",
    image: "https://via.placeholder.com/300",
    text: "We found several talented young individuals for our summer program. Highly recommend!",
  },
  {
    name: "Mike Johnson",
    role: "Student",
    image: "https://via.placeholder.com/300",
    text: "Finding a job while in school was a breeze thanks to this site!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>What People Are Saying</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3>{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
            <p className="testimonial-text">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
