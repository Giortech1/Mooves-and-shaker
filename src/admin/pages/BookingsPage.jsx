import "../AdminDashboard.css";

const bookingSummary = [
  { label: "Booked today", value: "36", tone: "green" },
  { label: "Pending", value: "17", tone: "gold" },
  { label: "Completed", value: "89", tone: "blue" },
  { label: "Cancelled", value: "4", tone: "red" },
];

const recentBookings = [
  { id: "BK-2041", customer: "Giorno Roman", service: "Luxury SUV", status: "Confirmed", date: "21 Sep 2026" },
  { id: "BK-2048", customer: "Safou Innousa", service: "Airport transfer", status: "Pending", date: "22 Sep 2026" },
  { id: "BK-2051", customer: "Tiencheu Alexandra", service: "Business sedan", status: "In progress", date: "23 Sep 2026" },
  { id: "BK-2062", customer: "Michael Tchoumi", service: "Flight + hotel", status: "Confirmed", date: "23 Sep 2026" },
];

function BookingsPage() {
  return (
    <div className="admin-page-content">
      <section className="summary-grid">
        {bookingSummary.map((item) => (
          <div key={item.label} className={`summary-card ${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Booking pipeline</h2>
          <button type="button">Export</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.service}</td>
                  <td>{booking.customer.split(" ")[0]}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase().replace(/\s+/g, "-")}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default BookingsPage;
