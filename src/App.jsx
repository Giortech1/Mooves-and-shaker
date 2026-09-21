import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import SuccessReset from './SuccessReset';
import Home from './Home';
import CarRent from './CarRent';
import BusinessSolution from './BusinessSolution';
import Fleet from './Fleet';
import FlightBooking from './FlightBooking';
import About from './About';
import Contact from './Contact';
import AdminDashboard from './admin/AdminDashboard';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const selector = '[class*="card"], [class*="Card"]';
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement?.querySelectorAll(selector) || []);
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = `${(idx >= 0 ? idx : 0) * 80}ms`;
          el.classList.add('reveal');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/success-reset" element={<SuccessReset />} />
      <Route path="/car-rent" element={<CarRent />} />
      <Route path="/business-solution" element={<BusinessSolution />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/flight-booking" element={<FlightBooking />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
