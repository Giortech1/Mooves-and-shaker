import "./About.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import { FaRocket, FaLightbulb, FaShieldAlt, FaHandshake } from "react-icons/fa";
import aboutBg from "./assets/img2.5.jpg";
import officeImg from "./assets/img 5.png";

function About() {
  return (
    <div className="about-page">
      <Navbar />

      <section
        className="about-hero"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="about-hero-overlay">
          <span className="hero-kicker">Premium mobility across Cameroon</span>
          <h1>Built for journeys that need comfort, speed, and trust.</h1>
          <p>
            Mooves delivers premium mobility solutions across Cameroon,
            including luxury car rentals, chauffeur services, airport
            transfers, and fleet management designed to move businesses and
            travelers with confidence.
          </p>

          <div className="hero-actions">
            <button className="btn-services">Our Services</button>
            <button className="btn-secondary">Talk to Us</button>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <strong>10+</strong>
              <span>Years of experience</span>
            </div>
            <div className="stat-box">
              <strong>500+</strong>
              <span>Fleet vehicles</span>
            </div>
            <div className="stat-box">
              <strong>24/7</strong>
              <span>Support coverage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="who-we-are">
        <div className="who-content">
          <span className="badge">WHO WE ARE</span>
          <h2>Smart mobility built around your needs.</h2>
          <p>
            At Mooves, we understand that reliable transportation is more than
            a service — it is a business advantage. That is why we design
            tailored rental and mobility solutions to support your operations,
            schedule, and day-to-day comfort.
          </p>

          <div className="who-features">
            <div className="who-feature">
              <FaRocket className="feature-icon" />
              <div>
                <h4>Premium Experience</h4>
                <p>Luxury, comfort, and smooth journeys from start to finish.</p>
              </div>
            </div>

            <div className="who-feature">
              <FaLightbulb className="feature-icon" />
              <div>
                <h4>Smart Solutions</h4>
                <p>Flexible transport options designed around business needs.</p>
              </div>
            </div>

            <div className="who-feature">
              <FaShieldAlt className="feature-icon" />
              <div>
                <h4>Trusted Reliability</h4>
                <p>Well-maintained vehicles and support you can count on.</p>
              </div>
            </div>
          </div>

          <button className="btn-services">Explore Services</button>
        </div>

        <div className="who-image">
          <img src={officeImg} alt="Mooves team member" />
          <div className="who-image-card">
            <p className="lorem">Our Mission is YOU</p>
            <h4>Professional Service</h4>
            <p className="card-text">Reliable support for every business journey.</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="values-header">
          <span className="badge dark">WHY CHOOSE US</span>
          <h3>Mobility designed to keep you moving.</h3>
        </div>

        <div className="value-grid">
          <div className="value-card highlight">
            <FaHandshake className="value-icon" />
            <h4>Client-first approach</h4>
            <p>We listen closely, customize quickly, and deliver service that fits your pace.</p>
          </div>

          <div className="value-card">
            <FaShieldAlt className="value-icon" />
            <h4>Quality assurance</h4>
            <p>Every vehicle is maintained to meet our standard for safety and comfort.</p>
          </div>

          <div className="value-card">
            <FaRocket className="value-icon" />
            <h4>Fast execution</h4>
            <p>From booking to arrival, we keep your trip moving without unnecessary delays.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Hear what people are saying about Mooves Travel and Location</h2>

        <div className="testimonial-grid">
          {[
            {
              name: "Giorno Roman",
              review:
                "Their service has been reliable, professional, and exactly what our business needs for smooth travel and transport planning.",
            },
            {
              name: "Safou Innousa",
              review:
                "The team is extremely responsive and the vehicle quality is outstanding. Every journey feels smooth, safe, and comfortable.",
            },
            {
              name: "Tiencheu Alexandra",
              review:
                "From airport pickup to business travel arrangements, everything was handled with care, punctuality, and excellent customer service.",
            },
          ].map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-avatar"></div>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.review}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
