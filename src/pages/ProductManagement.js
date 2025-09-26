import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../features/productSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  const initialForm = {
    key_name: '',
    display_name: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  // Fetch products on load
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate empty fields
    if (!formData.key_name || !formData.display_name) {
      setFormError('Key Name and Display Name are required.');
      return;
    }

    try {
      if (editingId) {
        await dispatch(updateProduct({ id: editingId, product: formData })).unwrap();
      } else {
        await dispatch(addProduct(formData)).unwrap();
      }
      setFormData(initialForm);
      setEditingId(null);
    } catch (err) {
      setFormError(err || 'Something went wrong.');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      key_name: product.key_name || '',
      display_name: product.display_name || '',
      description: product.description || '',
    });
    setEditingId(product.product_id);
    setFormError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
      } catch (err) {
        alert(err || 'Error deleting product');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        {formError && <p className="text-danger">{formError}</p>}

        <div className="mb-2">
          <input
            type="text"
            name="key_name"
            placeholder="Key Name"
            value={formData.key_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="display_name"
            placeholder="Display Name"
            value={formData.display_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Key Name</th>
              <th>Display Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.key_name}</td>
                <td>{p.display_name}</td>
                <td>{p.description || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.product_id)}
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

export default ProductManagement;
