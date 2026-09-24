import "../AdminDashboard.css";

const customerList = [
  { name: "Giorno Roman", segment: "Corporate", orders: 12, status: "Active" },
  { name: "Safou Innousa", segment: "Individual", orders: 6, status: "Active" },
  { name: "Tiencheu Alexandra", segment: "Business", orders: 9, status: "Pending" },
  { name: "Michael Tchoumi", segment: "Corporate", orders: 15, status: "VIP" },
];

function CustomersPage() {
  return (
    <div className="admin-page-content">
      <section className="panel">
        <div className="panel-header">
          <h2>Client directory</h2>
          <button type="button">Filter</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Segment</th>
                <th>Orders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer) => (
                <tr key={customer.name}>
                  <td>{customer.name}</td>
                  <td>{customer.segment}</td>
                  <td>{customer.orders}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase() === "active" ? "confirmed" : customer.status.toLowerCase() === "vip" ? "in-progress" : "pending"}`}>
                      {customer.status}
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

export default CustomersPage;
