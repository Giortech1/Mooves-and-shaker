
import { useState, useEffect, useRef } from 'react';
// Link not used in this component
import './CarRent.css';
import Navbar from './Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth.jsx';
import img1 from './assets/corola toyota.png';
import img2 from './assets/car1.png';
import img3 from './assets/2020_Mercedes-Benz_AMG_S_65-removebg-preview.png';
import img4 from './assets/escalade-removebg-preview.png';
import img5 from './assets/RAV4___TOYOTA_The_SUV__Redefined_-removebg-preview.png';
import img6 from './assets/img 8.png';
import img7 from './assets/Img 1.png';
import img8 from './assets/foot1.png';
import img9 from './assets/foot2.png';
import img10 from './assets/foot3.png';
import img11 from './assets/foot4.png';
import img12 from './assets/foot5.png';
import img13 from './assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';



// ── Icons (inline SVG helpers) ──────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);

const FuelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M3 22V8l4-4h8l4 4v14H3z"/><path d="M16 10h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/>
    <line x1="3" y1="11" x2="16" y2="11"/>
  </svg>
);

const AcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    <circle cx="12" cy="12" r="5"/>
  </svg>
);

const Minivan = () => (
  <svg viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="14">
    <rect x="1" y="6" width="30" height="10" rx="2"/>
    <path d="M5 6V3h14l4 3"/>
    <circle cx="7" cy="17" r="2"/><circle cx="25" cy="17" r="2"/>
  </svg>
);

const SedanIcon = () => (
  <svg viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="14">
    <rect x="1" y="9" width="30" height="8" rx="2"/>
    <path d="M5 9V7l5-4h12l5 4v2"/>
    <circle cx="8" cy="18" r="2"/><circle cx="24" cy="18" r="2"/>
  </svg>
);

const PickupIcon = () => (
  <svg viewBox="0 0 36 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="14">
    <rect x="1" y="8" width="34" height="9" rx="2"/>
    <path d="M4 8V5l4-3h10l3 3v3"/>
    <line x1="21" y1="8" x2="21" y2="17"/>
    <circle cx="8" cy="18" r="2"/><circle cx="28" cy="18" r="2"/>
  </svg>
);

const SuvIcon = () => (
  <svg viewBox="0 0 34 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="14">
    <rect x="1" y="7" width="32" height="10" rx="2"/>
    <path d="M4 7V4l4-2h18l4 2v3"/>
    <circle cx="8" cy="18" r="2"/><circle cx="26" cy="18" r="2"/>
  </svg>
);

// ── Car data ────────────────────────────────────────────────────────
const cars = [
  {
    id: 1,
    name: 'Mercedes',
    type: 'Sedan',
    price: 25,
    image: img2,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
  {
    id: 2,
    name: 'Toyota Corola',
    type: 'SUV',
    price: 20,
    image: img3,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
  {
    id: 3,
    name: 'Mercedes',
    type: 'Sedan',
    price: 30,
    image: img4,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
  {
    id: 4,
    name: 'Toyota',
    type: 'Pickup',
    price: 25,
    image: img5,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
  {
    id: 5,
    name: 'Toyota RAV 4',
    type: 'SUV',
    price: 25,
    image: img6,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
  {
    id: 6,
    name: 'Toyota',
    type: 'Pickup',
    price: 20,
    image: img7,
    features: ['Automat', 'PB 95', 'Air Conditioner'],
  },
];

const filterTabs = [
  { label: 'All vehicles', icon: null },
  { label: 'Minivan', icon: <Minivan /> },
  { label: 'Sedan', icon: <SedanIcon /> },
  { label: 'Cabriolet', icon: <SedanIcon /> },
  { label: 'Pickup', icon: <PickupIcon /> },
  { label: 'Suv', icon: <SuvIcon /> },
  { label: 'Economy', icon: <SedanIcon /> },
];

// ── Component ───────────────────────────────────────────────────────
const CarRent = () => {
  const [activeTab, setActiveTab] = useState('All vehicles');
  const [searchTerm, setSearchTerm] = useState('');
  const gridRef = useRef(null);
  const { user } = useAuth();

  const [carBooking, setCarBooking] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: 'All'
  });

  const handleCarBookingSubmit = async (specificCar = null) => {
    if (!user) {
      alert("Veuillez vous connecter pour effectuer une réservation.");
      return;
    }

    // On utilise soit la voiture sélectionnée dans la grille, soit le type choisi dans le formulaire
    const finalCarType = specificCar || carBooking.carType;

    if (!carBooking.pickupLocation || !carBooking.dropoffLocation || !carBooking.pickupDate || !carBooking.dropoffDate) {
      alert("Veuillez remplir les lieux et les dates dans le formulaire de réservation.");
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${API_BASE}/car-rental/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...carBooking, carType: finalCarType })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erreur ${response.status}: ${text || response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;

      if (data && data.success) {
        alert(`Demande de réservation envoyée pour : ${finalCarType}. Notre équipe vous contactera bientôt.`);
      } else {
        alert("Erreur: " + (data?.message || 'Réponse inattendue du serveur'));
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Une erreur est survenue lors de la réservation.");
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesTab = activeTab === 'All vehicles' || car.type === (activeTab === 'Suv' ? 'SUV' : activeTab);
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    // Reset animation class when tab changes to re-trigger staggered reveal
    el.classList.remove('animate');
    // Small timeout to ensure the DOM has updated with filtered items
    const timer = setTimeout(() => {
      el.classList.add('animate');
    }, 50);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="car-rent-container">
      <div>
        <Navbar />
      </div>

      {/* HERO */}
      <section className="car-rent-hero-section">
        <div className="car-rent-hero-content">
          <h1>Find the Perfect Vehicle for Every Journey</h1>
          <p>Explore our diverse fleet of luxury, business, SUV, and utility vehicles designed to meet your personal and professional transportation needs.</p>
          <button className="car-rent-hero-cta">View All Cars</button>
        </div>

        <div className="car-rent-hero-car-image">
          <img
            src={img1}
            alt="Featured car"
          />
        </div>

        <div className="booking-card">
          <h3>Book your car</h3>

          <div className="booking-field">
            <select 
              value={carBooking.carType} 
              onChange={(e) => setCarBooking({...carBooking, carType: e.target.value})}
            >
              <option value="" disabled>Car type</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Minivan</option>
              <option>Pickup</option>
              <option>Economy</option>
              <option>Cabriolet</option>
            </select>
          </div>

          <div className="booking-field">
            <select 
              value={carBooking.pickupLocation}
              onChange={(e) => setCarBooking({...carBooking, pickupLocation: e.target.value})}
            >
              <option value="" disabled>Place of rental</option>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Bafoussam</option>
            </select>
          </div>

          <div className="booking-field">
            <select 
              value={carBooking.dropoffLocation}
              onChange={(e) => setCarBooking({...carBooking, dropoffLocation: e.target.value})}
            >
              <option value="" disabled>Place of return</option>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Bafoussam</option>
            </select>
          </div>

          <div className="booking-field">
            <input 
              type="date" 
              value={carBooking.pickupDate}
              onChange={(e) => setCarBooking({...carBooking, pickupDate: e.target.value})}
            />
          </div>

          <div className="booking-field">
            <input 
              type="date" 
              value={carBooking.dropoffDate}
              onChange={(e) => setCarBooking({...carBooking, dropoffDate: e.target.value})}
            />
          </div>

          <button className="book-now-btn" onClick={() => handleCarBookingSubmit()}>Book now</button>
        </div>
      </section>

      {/* VEHICLES */}
      <section className="vehicles-section" id="car-rents">
        <div className="vehicles-header">
          <h2>Select a vehicle group</h2>
          <div className="search-bar">
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search your car" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              className={`filter-tab ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.icon && tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="car-grid" ref={gridRef}>
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <img src={car.image} alt={car.name} />

                <div className="car-info">
                  <div>
                    <div className="car-name">{car.name}</div>
                    <div className="car-type">{car.type}</div>
                  </div>
                  <div className="car-price">
                    <span className="price">${car.price}</span>
                    <span className="per-day">per day</span>
                  </div>
                </div>

                <div className="car-features">
                  <span className="car-feature"><GearIcon /> Automat</span>
                  <span className="car-feature"><FuelIcon /> PB 95</span>
                  <span className="car-feature"><AcIcon /> Air Conditioner</span>
                </div>

                <button 
                  className="view-details-btn"
                  onClick={() => handleCarBookingSubmit(car.name)}
                >Rent Now</button>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#6b7280', fontWeight: 500 }}>No vehicles found in this category.</h3>
            </div>
          )}
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default CarRent;