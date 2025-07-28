// redux below
import { createSlice } from '@reduxjs/toolkit';
// redux ends

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        deleteFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;