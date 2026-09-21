import { useState, useEffect, useRef } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth.jsx';
import {
  FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import heroSlide1 from "./assets/img slide 1.png";
import heroSlide2 from "./assets/img slide 2.png";
import heroSlide3 from "./assets/img slide 3.png";
import heroSlide4 from "./assets/img slide 4.png";
import heroSlide5 from "./assets/img slide 5.png";
import client1 from "./assets/Avatar6.png";
import client2 from "./assets/ayesha.png";
import client3 from "./assets/mehak.png";
import car from "./assets/corola toyota.png";
import visa from "./assets/visa.jpg";
import driver from "./assets/img 5.png";
import leasing from "./assets/busines_cooporate-removebg-preview.png";
import airport from "./assets/plane.jpg";
import pickup from "./assets/Img 1.png";
import fleet from "./assets/Creative_Poster_Design-removebg-preview.png";
import luxury from "./assets/luxury.jpg";
import fleet1 from "./assets/fleet.jpg";
const moove1 = new URL('./assets/Moove 1.JPEG', import.meta.url).href;
const moove2 = new URL('./assets/Moove 2.JPEG', import.meta.url).href;
const moove3 = new URL('./assets/Moove 3.JPEG', import.meta.url).href;
const moove4 = new URL('./assets/Moove 4.JPEG', import.meta.url).href;
const moove5 = new URL('./assets/Moove 5.JPEG', import.meta.url).href;
const moove6 = new URL('./assets/Moove 6.JPEG', import.meta.url).href;

const heroSlides = [
  {
    img: heroSlide1,
    title: "Drive Anywhere Across Cameroon & Beyond",
    text: "Choose from luxury, business, SUV and utility vehicles designed for comfort and adventure, anywhere life takes you.",
  },
  {
    img: heroSlide2,
    title: "Premium SUVs For Every Occasion",
    text: "From family trips to executive travel, our SUV fleet combines comfort, space, and reliability.",
  },
  {
    img: heroSlide3,
    title: "Comfort Meets Performance",
    text: "Discover our sedan collection, perfect for business travel and city driving in style.",
  },
  {
    img: heroSlide4,
    title: "Executive Rides With Total Confidence",
    text: "Travel in luxury, arrive in style, and enjoy a smoother experience with our premium chauffeur and executive fleet.",
  },
  {
    img: heroSlide5,
    title: "Business Mobility That Moves With You",
    text: "From airport transfers to full fleet support, we help you stay efficient, punctual, and comfortable every day.",
  },
];

const services = [
  {
    img: car,
    title: "Car Rental",
    text: "Choose from a wide range of reliable, luxury, and utility vehicles designed to give you comfort, flexibility, and confidence on every journey.",
  },
  {
    img: visa,
    title: "Flight Ticketing",
    text: "Book local and international flights with ease and enjoy a smooth travel experience supported by fast reservations and trusted service.",
  },
  {
    img: driver,
    title: "Chauffeur Services",
    text: "Travel in comfort with professional drivers dedicated to providing safe, punctual, and premium transportation experiences.",
  },
  {
    img: leasing,
    title: "Corporate Vehicle Leasing",
    text: "Empower your business with flexible vehicle leasing solutions tailored to support company operations, executive travel, and staff mobility.",
  },
  {
    img: airport,
    title: "Airport Transfer Services",
    text: "Enjoy stress-free pickups and drop-offs with dependable airport transportation designed for comfort, convenience, and punctuality.",
  },
  {
    img: pickup,
    title: "Utility & Pickup Vehicle Rental",
    text: "Get the power and durability you need with utility and pickup vehicles built to handle business operations, logistics, and demanding tasks.",
  },
  {
    img: fleet,
    title: "Fleet Management Services",
    text: "Optimize your business transportation with professional fleet management services focused on efficiency, reliability, and operational control.",
  },
  {
    img: luxury,
    title: "Executive / Luxury Transportation",
    text: "Experience premium mobility with luxury vehicles and first-class services designed for executives, VIP clients, and special occasions.",
  },
  {
    img: fleet1,
    title: "Business Mobility Solutions",
    text: "Simplify corporate transportation through smart mobility services designed to improve productivity, flexibility, and business performance.",
  },
];

const LOCATIONS = ["Douala Aéroport (DLA)", "Yaoundé Aéroport (NSI)", "Douala Akwa", "Yaoundé Centre-ville", "Bafoussam", "Kribi", "Limbe"];

const whyChoose = [
  {
    color: "#fde0e8",
    title: "Zero Deposit Required",
    text: "We know how vital cash flow is for growing businesses. Unlike traditional corporate leasing companies that require hefty upfront deposits, you can get started with a clean, lean and minimal entry fee.",
  },
  {
    color: "#dbe9ff",
    title: "Maintenance and Servicing are on Us",
    text: "Managing a fleet means dealing with unpredictable breakdowns. With Mooves, we handle all routine maintenance and scheduled servicing for you.",
  },
  {
    color: "#d6f5ec",
    title: "Full Commercial Insurance Included",
    text: "Mooves operate with comprehensive commercial insurance coverage. We've got you covered against unexpected events with zero added insurance stress.",
  },
  {
    color: "#fdf0d6",
    title: "Flexi-Car Scaling",
    text: "Markets change quickly, and your fleet should keep up. Add or remove vehicles whenever your business needs change.",
  },
  {
    color: "#fde0e8",
    title: "High-Efficiency & Electric Options",
    text: "Choose hybrid, fuel-efficient, or all-electric vehicles tailored to your needs while reducing operational carbon footprint.",
  },
  {
    color: "#e6f4d9",
    title: "A Clear Path to Asset Equity",
    text: "Our Drive-to-Own programs let your payments go toward eventual ownership when you decide it's time for your business to own its fleet.",
  },
];

const testimonials = [
  {
    img: client1,
    name: "Michael Tchoumi",
    role: "Business Traveler",
    text: "Mooves has transformed how we manage transportation for our team. Their fleet is always in excellent condition.",
  },
  {
    img: client2,
    name: "Giorno Roman",
    role: "CEO, Bizlocate",
    text: "I rented an SUV for a week-long trip and was impressed by the vehicle quality and customer service.",
  },
  {
    img: client3,
    name: "Sarah Nfor",
    role: "Entrepreneur",
    text: "Booking my flight and airport transfer through Mooves was effortless. The support team was responsive throughout my journey.",
  },
];

const premiumVehicles = [
  { title: 'Toyota Pickup', type: 'Luxury', image: moove1 },
  { title: 'Toyota Pickup', type: 'SUV', image: moove2 },
  { title: 'Toyota Pickup', type: 'Executive', image: moove3 },
  { title: 'Toyota Pickup', type: 'Sedan', image: moove4 },
  { title: 'Toyota Pickup', type: 'Adventure', image: moove5 },
  { title: 'Toyota Pickup', type: 'Luxury', image: moove6 },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [activeService, setActiveService] = useState('car');
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [flightClass, setFlightClass] = useState('Economy');
  const [showTravelers, setShowTravelers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flightResults, setFlightResults] = useState([]);
  const [isSearchingFlights, setIsSearchingFlights] = useState(false);
  
  const { user } = useAuth();
  
  const [flightSearch, setFlightSearch] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: ''
  });

  const [carBooking, setCarBooking] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: 'All'
  });

  const [pickupSearch, setPickupSearch] = useState('');
  const [dropoffSearch, setDropoffSearch] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  // Fermer les dropdowns si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target) &&
          dropoffRef.current && !dropoffRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCarBookingSubmit = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour effectuer une réservation.");
      return;
    }
    if (!carBooking.pickupLocation || !carBooking.dropoffLocation || !carBooking.pickupDate || !carBooking.dropoffDate) {
      alert("Veuillez remplir tous les champs de location.");
      return;
    }

    const token = localStorage.getItem('authToken');
    console.log("Token envoyé pour la réservation:", token);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/car-rental/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(carBooking)
      });
      const data = await response.json();
      if (data.success) {
        alert("Votre demande de location a été enregistrée ! L'admin vous contactera.");
        // Réinitialiser le formulaire
        setCarBooking({
          pickupLocation: '',
          dropoffLocation: '',
          pickupDate: '',
          dropoffDate: '',
          carType: 'All'
        });
      } else {
        alert("Erreur: " + data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Une erreur est survenue lors de l'envoi de la demande.");
    }
  };

  const handleFlightSearch = async () => {
    if (!flightSearch.from || !flightSearch.to || !flightSearch.departureDate) {
      alert("Veuillez remplir au moins le départ, l'arrivée et la date de départ.");
      return;
    }

    setIsSearchingFlights(true);
    try {
      const queryParams = new URLSearchParams({
        from: flightSearch.from,
        to: flightSearch.to,
        date: flightSearch.departureDate,
        class: flightClass
      });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/flights/search?${queryParams}`);
      const data = await response.json();
      setFlightResults(data.success ? data.flights : []);
    } catch (error) {
      console.error("Flight search error:", error);
    } finally {
      setIsSearchingFlights(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const currentVehicle = premiumVehicles[vehicleIndex];

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={slide.img} alt={slide.title} className="hero-img" />
            <div className="hero-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <button className="btn-explore">Explore Fleet</button>
            </div>
          </div>
        ))}

        <button className="slider-arrow left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-arrow right" onClick={nextSlide}>
          <FaChevronRight />
        </button>

        <div className="slider-dots">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-section">
        <div className="service-tabs">
          <button 
            className={`tab-btn ${activeService === 'car' ? 'active' : ''}`}
            onClick={() => setActiveService('car')}
          >
            Car Rent
          </button>
          <button 
            className={`tab-btn ${activeService === 'flight' ? 'active' : ''}`}
            onClick={() => setActiveService('flight')}
          >
            Flight Ticketing
          </button>
        </div>
        <div className="search-bar">
          <div className="search-main">
            {activeService === 'flight' && (
              <div className="flight-options-top">
                <div className="class-selector">
                  <div 
                    className="class-trigger" 
                    onClick={() => setShowClassDropdown(!showClassDropdown)}
                  >
                    {flightClass} <span className="arrow-down">▼</span>
                  </div>
                  {showClassDropdown && (
                    <ul className="class-dropdown">
                      {['Economy', 'Premium Economy', 'Business', 'First Class'].map((cls) => (
                        <li 
                          key={cls} 
                          onClick={() => {
                            setFlightClass(cls);
                            setShowClassDropdown(false);
                          }}
                        >
                          {cls}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            <div className="search-fields-row">
              {activeService === 'car' ? (
                <>
                  <div className="search-item" style={{ position: 'relative' }} ref={pickupRef}>
                    <label>Pickup Location</label>
                    <input 
                      type="text" 
                      placeholder="Select city..." 
                      value={pickupSearch}
                      onChange={(e) => { setPickupSearch(e.target.value); setActiveDropdown('pickup'); }}
                      onFocus={() => setActiveDropdown('pickup')}
                    />
                    {activeDropdown === 'pickup' && (
                      <ul className="autocomplete-dropdown">
                        {LOCATIONS.filter(l => l.toLowerCase().includes(pickupSearch.toLowerCase())).map(loc => (
                          <li key={loc} onClick={() => {
                            setCarBooking({...carBooking, pickupLocation: loc});
                            setPickupSearch(loc);
                            setActiveDropdown(null);
                          }}>{loc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="search-item" style={{ position: 'relative' }} ref={dropoffRef}>
                    <label>Drop Location</label>
                    <input 
                      type="text" 
                      placeholder="Select city..." 
                      value={dropoffSearch}
                      onChange={(e) => { setDropoffSearch(e.target.value); setActiveDropdown('dropoff'); }}
                      onFocus={() => setActiveDropdown('dropoff')}
                    />
                    {activeDropdown === 'dropoff' && (
                      <ul className="autocomplete-dropdown">
                        {LOCATIONS.filter(l => l.toLowerCase().includes(dropoffSearch.toLowerCase())).map(loc => (
                          <li key={loc} onClick={() => {
                            setCarBooking({...carBooking, dropoffLocation: loc});
                            setDropoffSearch(loc);
                            setActiveDropdown(null);
                          }}>{loc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="search-item">
                    <label>Pick-up Date</label>
                    <input 
                      type="date" 
                      value={carBooking.pickupDate}
                      onChange={(e) => setCarBooking({...carBooking, pickupDate: e.target.value})}
                    />
                  </div>
                  <div className="search-item">
                    <label>Drop Date</label>
                    <input 
                      type="date" 
                      value={carBooking.dropoffDate}
                      onChange={(e) => setCarBooking({...carBooking, dropoffDate: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="search-item">
                    <label>From</label>
                    <input 
                      type="text" 
                      placeholder="Departure City" 
                      value={flightSearch.from}
                      onChange={(e) => setFlightSearch({...flightSearch, from: e.target.value})}
                    />
                  </div>
                  <div className="search-item">
                    <label>To</label>
                    <input 
                      type="text" 
                      placeholder="Destination City" 
                      value={flightSearch.to}
                      onChange={(e) => setFlightSearch({...flightSearch, to: e.target.value})}
                    />
                  </div>
                  <div className="search-item">
                    <label>Departure</label>
                    <input 
                      type="date" 
                      value={flightSearch.departureDate}
                      onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                    />
                  </div>
                  <div className="search-item">
                    <label>Return</label>
                    <input 
                      type="date" 
                      value={flightSearch.returnDate}
                      onChange={(e) => setFlightSearch({...flightSearch, returnDate: e.target.value})}
                    />
                  </div>
                  <div className="search-item travelers-container">
                    <label>Travelers</label>
                    <div 
                      className="travelers-trigger" 
                      onClick={() => setShowTravelers(!showTravelers)}
                    >
                      {adults} Adult{adults > 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}
                    </div>
                    {showTravelers && (
                      <div className="travelers-dropdown">
                        <div className="traveler-type">
                          <div className="type-info">
                            <span>Adults</span>
                            <small>Age 12+</small>
                          </div>
                          <div className="type-controls">
                            <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                            <span>{adults}</span>
                            <button onClick={() => setAdults(adults + 1)}>+</button>
                          </div>
                        </div>
                        <div className="traveler-type">
                          <div className="type-info">
                            <span>Children</span>
                            <small>Age 2-11</small>
                          </div>
                          <div className="type-controls">
                            <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                            <span>{children}</span>
                            <button onClick={() => setChildren(children + 1)}>+</button>
                          </div>
                        </div>
                        <button className="done-btn" onClick={() => setShowTravelers(false)}>Done</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <button 
            className="btn-search" 
            onClick={activeService === 'car' ? handleCarBookingSubmit : handleFlightSearch}
            disabled={isSearchingFlights}
          >
            {isSearchingFlights ? 'Searching...' : 'Search'}
          </button>
        </div>
      </section>

      {/* FLIGHT RESULTS */}
      {activeService === 'flight' && flightResults.length > 0 && (
        <section className="flight-results-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className='section-text'>Available Tickets</h2>
          <div className="flight-results-grid">
            {flightResults.map(flight => (
              <div key={flight.id} className="flight-ticket-card" style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flight-info">
                  <h4 style={{ color: '#16a673', margin: '0' }}>{flight.airline}</h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0' }}>{flight.departureTime} ✈ {flight.arrivalTime}</p>
                  <p style={{ color: '#666', margin: '0' }}>{flight.from} to {flight.to}</p>
                </div>
                <div className="flight-price-action" style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71', margin: '0' }}>{flight.price} €</p>
                  <button className="rent-btn" style={{ marginTop: '10px' }}>Select Ticket</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="services-section">
        <h2>Our <span>Services</span></h2>
        <p className="services-subtitle">
          With years of experience and a dedicated team, we provide{' '}
          <span className="highlight">Premium mobility</span> solutions
          designed for <span className="highlight">comfort, reliability, and exceptional service.</span>
        </p>

        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <img src={s.img} alt={s.title} className="service-img" />
              <div className="service-content">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#" className="view-all">View All</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VEHICLE COLLECTION */}
      <section className="collection-section">
        <div className="collection-header">
          <div>
            <p className="section-kicker">Fleet showcase</p>
            <h2>Explore Our Premium Vehicle Collection</h2>
          </div>

          <div className="slider-controls">
            <button
              className="slider-btn"
              aria-label="Previous vehicle"
              onClick={() => setVehicleIndex((prev) => (prev === 0 ? premiumVehicles.length - 1 : prev - 1))}
            >
              <FaChevronLeft />
            </button>
            <button
              className="slider-btn"
              aria-label="Next vehicle"
              onClick={() => setVehicleIndex((prev) => (prev === premiumVehicles.length - 1 ? 0 : prev + 1))}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="collection-slider">
          <div className="collection-card featured">
            <div className="collection-image-wrap">
              <img src={currentVehicle.image} alt={currentVehicle.title} />
            </div>
            <div className="collection-info">
              <div className="collection-topline">
                <span className="collection-badge">{currentVehicle.type}</span>
              </div>
              <h4>{currentVehicle.title}</h4>
              <p>Toyota Pickup. Reliable, practical, and built for comfort in every journey.</p>
              <button className="btn-rent">View Details</button>
            </div>
          </div>

          <div className="collection-thumbs">
            {premiumVehicles.map((vehicle, index) => (
              <button
                key={vehicle.title}
                className={`thumb ${index === vehicleIndex ? 'active' : ''}`}
                onClick={() => setVehicleIndex(index)}
              >
                <img src={vehicle.image} alt={vehicle.title} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-section">
        <h2>Why Choose Us</h2>
        <p className="why-subtitle">
          Flexible mobility solutions designed to give you flexibility, and
          peace of mind whether you're renting a vehicle, managing
          transportation, or booking your next trip.
        </p>

        <div className="why-grid">
          {whyChoose.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon" style={{ background: item.color }}></div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <p className="testimonials-subtitle">
          Discover why individuals, professionals, and businesses trust
          Mooves for reliable mobility, vehicle rental, and travel solutions.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <img src={t.img} alt={t.name} className="testimonial-avatar" />
              <h4>{t.name}</h4>
              <span className="testimonial-role">{t.role}</span>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;