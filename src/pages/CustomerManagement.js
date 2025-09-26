import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../features/customerSlice';

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customer);

  const initialForm = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCustomer({ id: editingId, customer: formData }));
    } else {
      dispatch(addCustomer(formData));
    }
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (customer) => {
    setFormData({
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      dob: customer.dob || '',
      address: customer.address || '',
    });
    setEditingId(customer.customer_id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {editingId ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>

      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.customer_id}>
                <td>{c.first_name}</td>
                <td>{c.last_name || '-'}</td>
                <td>{c.email || '-'}</td>
                <td>{c.phone || '-'}</td>
                <td>{c.dob ? c.dob.slice(0, 10) : '-'}</td>
                <td>{c.address || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.customer_id)}
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

export default CustomerManagement;
