import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import './CarRents.css';
import Footer from './components/Footer';
import logo from './assets/logo.png';

// Fleet Assets
import mercedes from './assets/2020_Mercedes-Benz_AMG_S_65-removebg-preview.png';
import urus from './assets/ABT_Lamborghini_Urus_Scatenato_2024-removebg-preview.png';
import corolla from './assets/corola toyota.png';
import rav4 from './assets/RAV4___TOYOTA_The_SUV__Redefined_-removebg-preview.png';
import escalade from './assets/escalade-removebg-preview.png';
import black4x4 from './assets/white_4X4_car-removebg-preview.png';
import mercedesS from './assets/Mercedes_S_class-removebg-preview.png';

const CarRents = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { user, logout } = useAuth();

  const fleet = [
    { id: 1, name: "Mercedes-Benz AMG S 65", image: mercedes, price: "$200", type: "Luxury" },
    { id: 2, name: "Lamborghini Urus", image: urus, price: "$500", type: "Exotic" },
    { id: 3, name: "Toyota Corolla", image: corolla, price: "$50", type: "Economy" },
    { id: 4, name: "Toyota RAV4", image: rav4, price: "$80", type: "SUV" },
    { id: 5, name: "Cadillac Escalade", image: escalade, price: "$150", type: "SUV" },
    { id: 6, name: "Black 4x4 Off-Road", image: black4x4, price: "$120", type: "SUV" },
    { id: 7, name: "Mercedes S Class", image: mercedesS, price: "$180", type: "Luxury" },
  ];

  const categories = ['All', 'Luxury', 'Exotic', 'Economy', 'SUV'];

  const filteredFleet = fleet.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || car.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fleet-page-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Mooves Logo" />
          </Link>
        </div>
        
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/explore-fleet" onClick={() => setMenuOpen(false)}>Car rents</Link></li>
          <li><a href="#business-solutions" onClick={() => setMenuOpen(false)}>business solutions</a></li>
          <li><a href="#flight-booking" onClick={() => setMenuOpen(false)}>flight booking</a></li>
          <li><Link to="/explore-fleet" className="active" onClick={() => setMenuOpen(false)}>fleet</Link></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>about Us</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>contact</a></li>
          <li className="mobile-auth">
            {user ? (
               <div className="user-profile-mobile">
                  <span>{user.displayName || user.email}</span>
                  <button onClick={logout}>Logout</button>
               </div>
            ) : (
              <>
                <Link to="/login" className="nav-login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="nav-signup" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            )}
          </li>
        </ul>
        
        <div className="nav-auth desktop-auth">
          {user ? (
            <div className="user-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="user-name">{user.displayName || user.email}</span>
              <div className="user-icon-placeholder" style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#16a673', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
              <button onClick={logout} className="nav-logout-btn">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login">Login</Link>
              <Link to="/signup" className="nav-signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="fleet-hero">
        <div className="fleet-hero-content">
          <h1>Our Premium Fleet</h1>
          <p>Discover the perfect vehicle for your next journey, from luxury sedans to rugged SUVs.</p>
        </div>
      </header>

      {/* Filter Section */}
      <section className="fleet-filters-section">
        <div className="fleet-filters-container">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search for a car..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <main className="fleet-grid-section">
        <div className="fleet-grid">
          {filteredFleet.length > 0 ? (
            filteredFleet.map(car => (
              <div key={car.id} className="fleet-car-card">
                <div className="car-image-wrapper">
                  <img src={car.image} alt={car.name} />
                  <span className="car-tag">{car.type}</span>
                </div>
                <div className="car-details">
                  <h3>{car.name}</h3>
                  <div className="car-price-row">
                    <p className="price-value">{car.price}<span>/day</span></p>
                    <button className="rent-btn">Rent Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No vehicles found matching your criteria.</h3>
              <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="reset-btn">Reset Filters</button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarRents;
