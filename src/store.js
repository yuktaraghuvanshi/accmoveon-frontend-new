import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import customerReducer from './features/customerSlice';
import leadReducer from './features/leadSlice';
import productReducer from './features/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    lead: leadReducer,
    product: productReducer,
  },
});

export default store;
