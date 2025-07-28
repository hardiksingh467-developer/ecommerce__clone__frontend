import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from './cartSlice';

// provide this store to main.jsx
export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
  devTools:true
})