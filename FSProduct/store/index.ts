import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import orderReducer from "./reducers/orderSlice";
import cartReducer from "./reducers/cartSlice";

// Initialize global store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
