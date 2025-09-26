import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// Fetch leads
export const fetchLeads = createAsyncThunk(
  'lead/fetchLeads',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/leads');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error fetching leads');
    }
  }
);

// Add lead
export const addLead = createAsyncThunk(
  'lead/addLead',
  async (lead, { rejectWithValue }) => {
    try {
      const res = await api.post('/leads', lead);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error adding lead');
    }
  }
);

// Update lead
export const updateLead = createAsyncThunk(
  'lead/updateLead',
  async ({ id, lead }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/leads/${id}`, lead);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error updating lead');
    }
  }
);

// Delete lead
export const deleteLead = createAsyncThunk(
  'lead/deleteLead',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/leads/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail || 'Error deleting lead');
    }
  }
);

const leadSlice = createSlice({
  name: 'lead',
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.leads.push(action.payload);
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.leads = state.leads.map(l => l.id === action.payload.id ? action.payload : l);
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.leads = state.leads.filter(l => l.id !== action.payload.id);
      });
  },
});

export default leadSlice.reducer;
