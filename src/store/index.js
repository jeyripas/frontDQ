import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/Cart.slice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
