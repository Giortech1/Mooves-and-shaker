import "./BusinessSolution.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import {
  FaMoneyBillWave,
  FaCar,
  FaClock,
  FaCog,
} from "react-icons/fa";

function BusinessSolution() {
  return (
    <div className="business-page">
        <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>
          Smarter Mobility Solutions For
          <span> Modern Businesses</span>
        </h1>

        <p>
          Streamline employee transportation, executive travel,
          corporate leasing, airport transfers, and fleet management
          with flexible mobility solutions designed to help your
          business move efficiently.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Get a Proposal
          </button>

          <button className="btn-secondary">
            Schedule Consultation
          </button>
        </div>
      </section>

      {/* CHALLENGES SECTION */}
      <section className="challenges-section">

        <div className="challenge-text">
          <small>Challenges Businesses Face</small>

          <h2>
            We help organizations eliminate common transportation
            inefficiencies.
          </h2>
        </div>

        <div className="challenge-cards">

          <div className="card">
            <div className="icon-box">
              <FaMoneyBillWave />
            </div>
            <h3>High Transportation Costs</h3>
            <p>
              Reduce unnecessary expenses with optimized mobility plans.
            </p>
          </div>

          <div className="card">
            <div className="icon-box">
              <FaCar />
            </div>
            <h3>Poor Fleet Utilization</h3>
            <p>
              Maximize vehicle usage and operational efficiency.
            </p>
          </div>

          <div className="card">
            <div className="icon-box">
              <FaClock />
            </div>
            <h3>Employee Travel Delays</h3>
            <p>
              Ensure reliable transportation for your workforce.
            </p>
          </div>

          <div className="card">
            <div className="icon-box">
              <FaCog />
            </div>
            <h3>Complex Mobility Management</h3>
            <p>
              Manage transportation from one centralized platform.
            </p>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section">

        <h2>
          Tailored Mobility Services For Every Business
        </h2>

        <div className="services-grid">

          <div>
            <h3>Corporate Car Rentals</h3>
            <p>
              Flexible daily, weekly, and monthly vehicle rentals.
            </p>
          </div>

          <div>
            <h3>Executive Chauffeur Services</h3>
            <p>
              Professional drivers for executives and VIP guests.
            </p>
          </div>

          <div>
            <h3>Airport Transfers</h3>
            <p>
              Reliable airport pickups and drop-offs.
            </p>
          </div>

          <div>
            <h3>Corporate Leasing</h3>
            <p>
              Long-term vehicle leasing solutions.
            </p>
          </div>

          <div>
            <h3>Fleet Management</h3>
            <p>
              Vehicle monitoring, maintenance, and optimization.
            </p>
          </div>

          <div>
            <h3>Business Travel Booking</h3>
            <p>
              Flight reservations and travel coordination.
            </p>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}

export default BusinessSolution;