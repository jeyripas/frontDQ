import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    setCart: (state, action) => {
      const updatedCart = [...state, ...action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    incrementCounter: (state, action) => {
      const { index } = action.payload;
      state[index].counter += 1;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementCounter: (state, action) => {
      const { index } = action.payload;
      if (state[index].counter > 1) {
        state[index].counter -= 1;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeProduct: (state, action) => {
      const { index } = action.payload;
      state.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      return [];
    },
  },
});

export const {
  setCart,
  incrementCounter,
  decrementCounter,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
