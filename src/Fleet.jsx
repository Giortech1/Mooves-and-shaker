import "./Fleet.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import { FaCogs, FaUserFriends, FaSnowflake, FaCar, FaHeadset, FaShieldAlt } from "react-icons/fa";

const moove1 = new URL('./assets/Moove 1.JPEG', import.meta.url).href;
const moove2 = new URL('./assets/Moove 2.JPEG', import.meta.url).href;
const moove3 = new URL('./assets/Moove 3.JPEG', import.meta.url).href;
const moove4 = new URL('./assets/Moove 4.JPEG', import.meta.url).href;
const moove5 = new URL('./assets/Moove 5.JPEG', import.meta.url).href;
const moove6 = new URL('./assets/Moove 6.JPEG', import.meta.url).href;

import garageImg from "./assets/garage.jpg";

const vehicles = [
  { name: "Toyota Pickup", type: "Luxury", img: moove1 },
  { name: "Toyota Pickup", type: "Executive", img: moove2 },
  { name: "Toyota Pickup", type: "Premium", img: moove3 },
  { name: "Toyota Pickup", type: "Sedan", img: moove4 },
  { name: "Toyota Pickup", type: "Adventure", img: moove5 },
  { name: "Toyota Pickup", type: "Luxury", img: moove6 },
];

const categories = ["All vehicles", "Luxury", "Executive", "Premium", "Sedan", "Adventure"];

function Fleet() {
  return (
    <div className="fleet-page">
      <Navbar />

      {/* HERO */}
      <section className="fleet-hero">
        <div className="fleet-hero-text">
          <h1>
            A Fleet Designed <br /> For Every Journey
          </h1>
          <p>
            From economy vehicles and executive sedans to luxury SUVs and
            business transport solutions, discover a fleet built for comfort,
            safety, and reliability.
          </p>
          <div className="fleet-hero-buttons">
            <button className="btn-outline">Explore Fleet →</button>
            <button className="btn-white">Contact Fleet Team</button>
          </div>
        </div>

        <div className="fleet-hero-image">
          <img src={moove1} alt="Toyota Pickup fleet vehicle" />
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="fleet-filter-wrapper">
        <div className="fleet-filter">
          {categories.map((cat, i) => (
            <span key={i} className={i === 0 ? "active" : ""}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* VEHICLE GRID */}
      <section className="fleet-grid">
        {vehicles.map((v, i) => (
          <div className="vehicle-card" key={i}>
            <img src={v.img} alt={v.name} className="vehicle-img" />
            <div className="vehicle-info">
              <div className="vehicle-title-row">
                <div>
                  <h3>{v.name}</h3>
                  <span className="vehicle-type">{v.type}</span>
                </div>
              </div>

              <p className="vehicle-description">Toyota Pickup.</p>

              <div className="vehicle-specs">
                <span>
                  <FaCogs /> Automatic
                </span>
                <span>
                  <FaUserFriends /> Comfortable
                </span>
                <span>
                  <FaSnowflake /> Reliable
                </span>
              </div>

              <button className="btn-view">View Details</button>
            </div>
          </div>
        ))}
      </section>

      <div className="view-all-wrapper">
        <button className="btn-view-all">View all Vehicles</button>
      </div>

      {/* WHY OUR FLEET STANDS OUT */}
      <section className="fleet-why">
        <div className="why-title">
          <h2>WHY OUR FLEET STANDS OUT</h2>
        </div>

        <div className="why-item">
          <h4>Safety First</h4>
          <p>Regular inspections and maintenance for your peace of mind.</p>
        </div>

        <div className="why-item">
          <h4>Premium Comfort</h4>
          <p>Modern interiors and advanced features for a superior experience.</p>
        </div>

        <div className="why-item">
          <h4>Reliable Performance</h4>
          <p>
            Vehicles maintained to the highest standards for reliability.
          </p>
        </div>

        <div className="why-item">
          <h4>Flexible Rental Options</h4>
          <p>
            Daily, weekly, monthly, and long-term plans that fit your needs.
          </p>
        </div>
      </section>

      {/* FLEET MANAGEMENT EXCELLENCE */}
      <section className="fleet-management">
        <div className="management-image">
          <img src={garageImg} alt="Fleet management" />
        </div>

        <div className="management-content">
          <h3>FLEET MANAGEMENT EXCELLENCE</h3>
          <h2>Professionally Managed For Maximum Reliability</h2>
          <p>
            Our fleet undergoes regular maintenance, quality inspections, and
            performance monitoring to ensure every vehicle meets our premium
            service standards.
          </p>

          <div className="management-stats">
            <div className="stat">
              <div className="stat-icon"><FaCar /></div>
              <span>500+ Vehicles</span>
            </div>
            <div className="stat">
              <div className="stat-icon"><FaUserFriends /></div>
              <span>Availability Rate</span>
            </div>
            <div className="stat">
              <div className="stat-icon"><FaHeadset /></div>
              <span>24/7 Support</span>
            </div>
            <div className="stat">
              <div className="stat-icon"><FaShieldAlt /></div>
              <span>Insured Fleet</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
      
          
        );
      }

export default Fleet;
