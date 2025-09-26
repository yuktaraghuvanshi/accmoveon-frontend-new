import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/products');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error fetching products');
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const res = await api.post('/products', product);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error adding product');
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}`, product);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error updating product');
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error deleting product');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => { state.products = state.products.map(p => p.id === action.payload.id ? action.payload : p); })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.products = state.products.filter(p => p.id !== action.payload.id); });
  },
});

export default productSlice.reducer;
