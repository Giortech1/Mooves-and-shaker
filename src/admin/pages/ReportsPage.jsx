import "../AdminDashboard.css";
import { FaChartBar } from "react-icons/fa";

const reports = [
  "Corporate bookings increased 18% this month compared with last month.",
  "Airport transfers remain the highest-demand service in the last 7 days.",
  "Vehicle utilization is strongest in the business class fleet.",
];

function ReportsPage() {
  return (
    <div className="admin-page-content">
      <section className="panel">
        <div className="panel-header">
          <h2>Monthly performance</h2>
          <FaChartBar />
        </div>
        <div className="chart-box large-chart">
          <div className="chart-bars">
            {[30, 54, 74, 62, 88, 92, 76].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Key insights</h2>
          <button type="button">Share</button>
        </div>
        <ul className="alert-list compact-list">
          {reports.map((report) => (
            <li key={report}>{report}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ReportsPage;
