import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import appStore from '../assets/foot1.png';
import googlePlay from '../assets/foot2.png';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Car Rents', to: '/car-rent' },
  { label: 'Business Solution', to: '/business-solution' },
  { label: 'Flight Booking', to: '/flight-booking' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  'Car Rental',
  'Flight Ticketing',
  'Chauffeur Services',
  'Corporate Vehicle Leasing',
  'Airport Transfer Service',
  'Utility Pickup Vehicle Rental',
  'Fleet Management Service',
  'Executive/Luxury Transportation',
  'Business Mobility Solution',
];

const support = [
  'Help Center',
  'FAQs',
  'Terms & Conditions',
  'Privacy Policy',
  'Booking Policy',
  'Customer Support',
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Mooves Logo" className="footer-logo" />
          <p>
            Premium mobility, vehicle rental, fleet management, and
            ticketing solutions designed to deliver comfort, flexibility,
            and reliability.
          </p>

          <h4>Download App</h4>
          <div className="app-buttons">
            <img src={appStore} alt="App Store" />
            <img src={googlePlay} alt="Google Play" />
          </div>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">
            <FaMapMarkerAlt /> Address
          </h4>
          <p>BP 482 Douala - Makepe montée BM</p>

          <h4 className="footer-heading green">Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">
            <FaEnvelope /> Email
          </h4>
          <p>business@moove-location.com</p>

          <h4 className="footer-heading green">Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service}><Link to="/contact">{service}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">
            <FaPhoneAlt /> Phone
          </h4>
          <p>
            +237 653 1716 34 <br /> 692 38 29 17
          </p>

          <h4 className="footer-heading green">Support</h4>
          <ul>
            {support.map((item) => (
              <li key={item}><Link to="/contact">{item}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Mooves Travel and Location. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
