import "../AdminDashboard.css";
import { FaRoute } from "react-icons/fa";

const fleetSummary = [
  { name: "Luxury SUVs", uptime: "96%", utilization: "72%" },
  { name: "Executive sedans", uptime: "94%", utilization: "68%" },
  { name: "Vans & shuttles", uptime: "92%", utilization: "61%" },
];

const fleetStatus = [
  { name: "Luxury SUVs", available: 18, booked: 7, maintenance: 2 },
  { name: "Executive sedans", available: 12, booked: 9, maintenance: 1 },
  { name: "Pickup vehicles", available: 10, booked: 5, maintenance: 3 },
];

function FleetPage() {
  return (
    <div className="admin-page-content">
      <section className="summary-grid">
        {fleetSummary.map((fleet) => (
          <div key={fleet.name} className="summary-card fleet-card">
            <div className="mini-icon"><FaRoute /></div>
            <div>
              <span>{fleet.name}</span>
              <strong>{fleet.utilization}</strong>
            </div>
            <small>{fleet.uptime} uptime</small>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Fleet utilization</h2>
          <button type="button">Review garage</button>
        </div>

        <div className="fleet-usage-list">
          {fleetStatus.map((fleet) => (
            <div className="usage-row" key={fleet.name}>
              <div className="usage-meta">
                <strong>{fleet.name}</strong>
                <span>{fleet.available} available</span>
              </div>
              <div className="usage-bar">
                <span style={{ width: `${Math.min((fleet.booked / (fleet.available + fleet.booked + fleet.maintenance)) * 100, 100)}%` }} />
              </div>
              <div className="usage-legend">
                <span>{fleet.booked} booked</span>
                <span>{fleet.maintenance} maintenance</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FleetPage;
