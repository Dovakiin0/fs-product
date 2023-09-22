import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../types/ICart";

interface CartState {
  cart: ICart[];
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createCartItem: (state, { payload }: PayloadAction<ICart>) => {
      state.cart.push(payload);
    },
    increase: (state, { payload }: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.product.id === payload);
      if (index !== -1) {
        state.cart[index].quantity += 1;
        state.totalPrice += state.cart[index].product.price;
      }
    },
    decrease: (state, { payload }: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.product.id === payload);
      if (index !== -1) {
        state.cart[index].quantity -= 1;
        state.totalPrice -= state.cart[index].product.price;
      }
    },
  },
});

export const { createCartItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
