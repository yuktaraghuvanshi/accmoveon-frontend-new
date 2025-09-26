import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, leadRes, productRes] = await Promise.all([
          api.get('/customers'),
          api.get('/leads'),
          api.get('/products')
        ]);
        
        console.log('Customers:', customerRes.data);
        console.log('Leads:', leadRes.data);
        console.log('Products:', productRes.data);
          setCustomers(customerRes.data);
        setLeads(leadRes.data);
        setProducts(productRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading Dashboard...</p>;

  // Total customers
  const totalCustomers = customers.length;

  // Map product_id → display_name
  const productMapById = {};
  products.forEach(p => {
    productMapById[p.product_id] = p.display_name;
  });

  // Customers per product (unique customers via leads)
  const customerIdsPerProduct = {};
  leads.forEach(lead => {
    const productName = productMapById[lead.product_id] || 'Unknown';
    if (!customerIdsPerProduct[productName]) customerIdsPerProduct[productName] = new Set();
    customerIdsPerProduct[productName].add(lead.customer_id);
  });

  const customerProductMap = {};
  Object.entries(customerIdsPerProduct).forEach(([productName, customerSet]) => {
    customerProductMap[productName] = customerSet.size;
  });

  // Leads by status
  const leadMap = { new: 0, 'in-progress': 0, closed: 0 };
  leads.forEach(l => {
    if (leadMap[l.status] !== undefined) leadMap[l.status] += 1;
  });

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <p>Total Customers: <strong>{totalCustomers}</strong></p>

      {/* Customers per Product Table */}
      <div className="mt-4">
        <h4>Customers per Product</h4>
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Customers</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(customerProductMap).map(([product, count]) => (
              <tr key={product}>
                <td>{product}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leads by Status Table */}
      <div className="mt-4">
        <h4>Leads by Status</h4>
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>Status</th>
              <th>Total Leads</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(leadMap).map(([status, count]) => (
              <tr key={status}>
                <td>{status}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
