import "../AdminDashboard.css";
import { FaCog, FaCheckCircle } from "react-icons/fa";

const settingsOptions = [
  "Automated booking confirmation",
  "Driver availability alerts",
  "Payment reminder emails",
  "New fleet maintenance notifications",
];

function SettingsPage() {
  return (
    <div className="admin-page-content">
      <section className="panel">
        <div className="panel-header">
          <h2>System preferences</h2>
          <FaCog />
        </div>

        <div className="setting-list">
          {settingsOptions.map((option) => (
            <div key={option} className="setting-item">
              <div>
                <strong>{option}</strong>
                <small>Enabled for all operations</small>
              </div>
              <span className="toggle-pill">
                <FaCheckCircle />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
