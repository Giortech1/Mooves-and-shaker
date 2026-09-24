import "./AdminDashboard.css";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { FaBell, FaCalendarAlt, FaChevronDown, FaSearch, FaShieldAlt } from "react-icons/fa";
import OverviewPage from "./pages/OverviewPage";
import BookingsPage from "./pages/BookingsPage";
import FleetPage from "./pages/FleetPage";
import CustomersPage from "./pages/CustomersPage";
import DriversPage from "./pages/DriversPage";
import FinancePage from "./pages/FinancePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

const navItems = [
  { label: "Overview", to: "/admin" },
  { label: "Bookings", to: "/admin/bookings" },
  { label: "Fleet", to: "/admin/fleet" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Drivers", to: "/admin/drivers" },
  { label: "Finance", to: "/admin/finance" },
  { label: "Reports", to: "/admin/reports" },
  { label: "Settings", to: "/admin/settings" },
];

const pageTitles = {
  Overview: "Welcome back, Admin",
  Bookings: "Bookings management",
  Fleet: "Fleet operations",
  Customers: "Customer overview",
  Drivers: "Driver management",
  Finance: "Finance dashboard",
  Reports: "Reports and insights",
  Settings: "Settings",
};

function AdminDashboard() {
  const location = useLocation();

  const currentLabel =
    navItems.find((item) => {
      if (location.pathname === "/admin" || location.pathname === "/admin/") {
        return item.to === "/admin";
      }
      return location.pathname.startsWith(item.to);
    })?.label || "Overview";

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="brand-block">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-name">Mooves</p>
            <span className="brand-label">Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="card-icon">
            <FaShieldAlt />
          </div>
          <div>
            <strong>System status</strong>
            <p>All services operational</p>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title-wrap">
            <div>
              <p className="eyebrow">
                {currentLabel === "Overview" ? "Operations overview" : "Admin workspace"}
              </p>
              <h1>{pageTitles[currentLabel]}</h1>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search bookings, customers..." />
            </div>

            <button className="icon-button" type="button" aria-label="Alerts">
              <FaBell />
            </button>

            <button className="profile-pill" type="button">
              <span className="profile-avatar">A</span>
              <span>Admin</span>
              <FaChevronDown />
            </button>
          </div>
        </header>

        <section className="top-strip">
          <div className="date-tag">
            <FaCalendarAlt />
            <span>Today • 21 Sep 2026</span>
          </div>

          <button className="primary-action" type="button">
            + New Booking
          </button>
        </section>

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;
