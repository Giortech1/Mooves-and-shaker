import "../AdminDashboard.css";
import { FaUserCog } from "react-icons/fa";

const drivers = [
  { name: "Nicolas Tcham", route: "Yaoundé - Douala", rating: 4.9, status: "Available" },
  { name: "Florence Mveng", route: "Airport transfer", rating: 4.8, status: "On duty" },
  { name: "Yves Fokou", route: "Corporate account", rating: 4.9, status: "Available" },
  { name: "Aline Ntem", route: "City tours", rating: 4.7, status: "On break" },
];

function DriversPage() {
  return (
    <div className="admin-page-content">
      <section className="summary-grid three-up">
        {drivers.map((driver) => (
          <div key={driver.name} className="summary-card driver-card">
            <div className="mini-icon user-icon"><FaUserCog /></div>
            <div className="driver-card-copy">
              <strong>{driver.name}</strong>
              <span>{driver.route}</span>
            </div>
            <div className="driver-meta">
              <small>{driver.rating} / 5</small>
              <em>{driver.status}</em>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DriversPage;
