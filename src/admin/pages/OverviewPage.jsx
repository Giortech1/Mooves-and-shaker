import "../AdminDashboard.css";
import {
  FaCarAlt,
  FaPlaneDeparture,
  FaUsers,
  FaMoneyBillWave,
  FaChartBar,
} from "react-icons/fa";

const stats = [
  {
    label: "Total bookings",
    value: "248",
    delta: "+18%",
    icon: <FaCarAlt />,
    tone: "green",
  },
  {
    label: "Flight reservations",
    value: "96",
    delta: "+12%",
    icon: <FaPlaneDeparture />,
    tone: "gold",
  },
  {
    label: "Active customers",
    value: "1,430",
    delta: "+9%",
    icon: <FaUsers />,
    tone: "blue",
  },
  {
    label: "Revenue",
    value: "XAF 12.8M",
    delta: "+22%",
    icon: <FaMoneyBillWave />,
    tone: "green",
  },
];

const recentBookings = [
  { id: "BK-2041", customer: "Giorno Roman", service: "Luxury SUV", status: "Confirmed", date: "21 Sep 2026" },
  { id: "BK-2048", customer: "Safou Innousa", service: "Airport transfer", status: "Pending", date: "22 Sep 2026" },
  { id: "BK-2051", customer: "Tiencheu Alexandra", service: "Business sedan", status: "In progress", date: "23 Sep 2026" },
  { id: "BK-2062", customer: "Michael Tchoumi", service: "Flight + hotel", status: "Confirmed", date: "23 Sep 2026" },
];

const fleetStatus = [
  { name: "Luxury SUVs", available: 18, booked: 7, maintenance: 2 },
  { name: "Executive sedans", available: 12, booked: 9, maintenance: 1 },
  { name: "Pickup vehicles", available: 10, booked: 5, maintenance: 3 },
];

const alerts = [
  "3 vehicles need servicing before the end of the week.",
  "2 new flight bookings await confirmation.",
  "Customer payment review required for one corporate account.",
];

function OverviewPage() {
  return (
    <div className="admin-page-content">
      <section className="stats-grid">
        {stats.map((stat) => (
          <div className={`stat-card ${stat.tone}`} key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-copy">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
            <div className="delta">{stat.delta}</div>
          </div>
        ))}
      </section>

      <section className="content-grid">
        <div className="panel large-panel">
          <div className="panel-header">
            <h2>Recent bookings</h2>
            <button type="button">View all</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.service}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase().replace(/\s+/g, "-")}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Fleet overview</h2>
            <button type="button">Manage</button>
          </div>

          <div className="fleet-list">
            {fleetStatus.map((fleet) => (
              <div className="fleet-row" key={fleet.name}>
                <div className="fleet-label">
                  <strong>{fleet.name}</strong>
                </div>
                <div className="fleet-metrics">
                  <span>{fleet.available} available</span>
                  <span>{fleet.booked} booked</span>
                  <span>{fleet.maintenance} servicing</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Performance</h2>
            <FaChartBar />
          </div>

          <div className="chart-box">
            <div className="chart-bars">
              {[40, 66, 48, 78, 82, 74, 88].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Priority alerts</h2>
            <button type="button">Review</button>
          </div>

          <ul className="alert-list">
            {alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;
