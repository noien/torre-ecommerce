import React, { useState } from "react";
import "../styles/Homepage.css";
import emailjs from "emailjs-com"; 
import modelImage from "../assets/model.png";


const Homepage = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_e3djy2k",
        "template_8e1ycxu",
        { email },
        "LgrOyAUIKoefT5iSp"
      )
      .then(
        () => {
          alert("Verification email sent successfully!");
          setEmail("");
        },
        (error) => {
          console.error(error);
          alert("Failed to send verification email. Please try again.");
        }
      );
  };

  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 className="homepage-title">INK & THREADS</h1>
        <p className="homepage-subtitle">Premium Embroidered</p>

        <div className="homepage-buttons">
          <button className="btn">PREMIUM CAPS</button>
          <button className="btn">PATCHES</button>
        </div>

        <p className="homepage-description">
          "Discover premium embroidered caps designed for style, comfort, and durability.
          From custom designs to timeless classics, our caps let you wear your
          personality with every stitch."
        </p>

        {/* Email verification form — placed directly below description */}
        <div className="email-section">
          <h3 className="email-title">Join Our Collection</h3>
          <p className="email-text">
            Enter your email to receive verification and exclusive updates.
          </p>
          <form onSubmit={handleEmailSubmit} className="email-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Verification</button>
          </form>
        </div>
      </div>

      <div className="homepage-image">
        <img src={modelImage} alt="Model wearing cap" />
      </div>
    </div>
  );
};

export default Homepage;
