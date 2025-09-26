import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// Fetch customers
export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/customers');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error fetching customers');
    }
  }
);

// Add customer
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (customer, { rejectWithValue }) => {
    try {
      const res = await api.post('/customers', customer);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error adding customer');
    }
  }
);

// Update customer
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ id, customer }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/customers/${id}`, customer);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error updating customer');
    }
  }
);

// Delete customer
export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/customers/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error deleting customer');
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })

      // update
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map(c =>
          c.id === action.payload.id ? action.payload : c
        );
      })

      // delete
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(c => c.id !== action.payload.id);
      });
  },
});

export default customerSlice.reducer;
