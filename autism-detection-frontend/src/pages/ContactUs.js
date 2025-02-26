import React from "react";
import "./ContactUs.css";
import hiteshImg from "../assets/hitesh.png"; // Replace with actual image
import aroonImg from "../assets/aroon.png"; // Replace with actual image
import dhaneshImg from "../assets/dhanesh.png"; // Replace with actual image

const ContactUs = () => {
  const teamMembers = [
    {
      name: "Hitesh Kumar",
      degree: "BS in Computer Science",
      email: "valechahitesh3@gmail.com",
      image: hiteshImg,
    },
    {
      name: "Aroon Kumar",
      degree: "BS in Artificial Intelligence",
      email: "k214707@nu.edu.pk",
      image: aroonImg,
    },
    {
      name: "Dhanesh Kumar",
      degree: "BS in Computer Science",
      email: "k214581@nu.edu.pk",
      image: dhaneshImg,
    },
  ];

  return (
    <div className="contact-container">
      <h1 className="contact-title">The Minds Behind the Project</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="card-glow"></div>
            <img src={member.image} alt={member.name} className="team-img" />
            <h2 className="team-name">{member.name}</h2>
            <p className="team-degree">{member.degree}</p>
            <a href={`mailto:${member.email}`} className="team-email">
              {member.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
