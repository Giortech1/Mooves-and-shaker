import "../AdminDashboard.css";
import { FaDollarSign } from "react-icons/fa";

const financialStats = [
  { label: "Gross revenue", value: "XAF 4.3M", delta: "+14%" },
  { label: "Net margin", value: "31%", delta: "+3.2%" },
  { label: "Outstanding", value: "XAF 820K", delta: "-6%" },
];

function FinancePage() {
  return (
    <div className="admin-page-content">
      <section className="summary-grid">
        {financialStats.map((item) => (
          <div key={item.label} className="summary-card finance-card">
            <div className="mini-icon"><FaDollarSign /></div>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <small>{item.delta}</small>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Recent transactions</h2>
          <button type="button">View ledger</button>
        </div>

        <ul className="alert-list compact-list">
          <li>Corporate account settlement posted for 3 fleet bookings.</li>
          <li>Airport transfer payout to driver group cleared successfully.</li>
          <li>One payment reminder sent to a delayed corporate client.</li>
        </ul>
      </section>
    </div>
  );
}

export default FinancePage;
