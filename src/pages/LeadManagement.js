import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLeads,
  addLead,
  updateLead,
  deleteLead,
} from '../features/leadSlice';
import { fetchCustomers } from '../features/customerSlice';
import { fetchProducts } from '../features/productSlice';

const LeadManagement = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.lead);
  const { customers } = useSelector((state) => state.customer);
  const { products } = useSelector((state) => state.product);

  const initialForm = {
    customer_id: '',
    product_id: '',
    assigned_to: '',
    status: 'new',
    priority: 2,
    source: 'web',
    notes: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // Fetch leads, customers, products
  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required UUID fields
    if (!formData.customer_id || !formData.product_id) {
      alert('Please select a customer and a product.');
      return;
    }

    console.log('Submitting lead:', formData); // Debug request payload

    if (editingId) {
      dispatch(updateLead({ id: editingId, lead: formData }));
    } else {
      dispatch(addLead(formData));
    }

    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (lead) => {
    setFormData({
      customer_id: lead.customer_id,
      product_id: lead.product_id,
      assigned_to: lead.assigned_to || '',
      status: lead.status || 'new',
      priority: lead.priority || 2,
      source: lead.source || 'web',
      notes: lead.notes || '',
    });
    setEditingId(lead.lead_id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      dispatch(deleteLead(id));
    }
  };

  // Helper to get names from IDs
  const getCustomerName = (id) => {
    const customer = customers.find((c) => c.customer_id === id);
    return customer ? `${customer.first_name} ${customer.last_name || ''}` : id;
  };

  const getProductName = (id) => {
    const product = products.find((p) => p.product_id === id);
    return product ? product.display_name : id;
  };

  return (
    <div className="container mt-4">
      <h2>Lead Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-2">
          <div className="col-md-6">
            <label>Customer</label>
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.customer_id} value={c.customer_id}>
                  {c.first_name} {c.last_name || ''}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Product</label>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.product_id} value={p.product_id}>
                  {p.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-control"
            >
              <option value={1}>High</option>
              <option value={2}>Normal</option>
              <option value={3}>Low</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Lead' : 'Add Lead'}
        </button>
      </form>

      {loading ? (
        <p>Loading leads...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.lead_id}>
                <td>{getCustomerName(l.customer_id)}</td>
                <td>{getProductName(l.product_id)}</td>
                <td>{l.status}</td>
                <td>
                  {l.priority === 1
                    ? 'High'
                    : l.priority === 2
                    ? 'Normal'
                    : 'Low'}
                </td>
                <td>{l.notes || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(l)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(l.lead_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadManagement;
