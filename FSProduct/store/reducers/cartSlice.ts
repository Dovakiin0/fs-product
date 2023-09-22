import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../types/ICart";
import { IProduct } from "../../types/IProduct";

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
    createCartItem: (state, { payload }: PayloadAction<IProduct>) => {
      const index = state.cart.findIndex(
        (item) => item.product.id === payload.id,
      );
      if (index !== -1) {
        state.cart[index].quantity += 1;
        state.totalPrice += state.cart[index].product.price;
        return;
      }
      const product = {
        product: payload,
        quantity: 1,
        total: payload.price,
      };
      state.cart.push(product);
      state.totalPrice += payload.price;
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
      if (state.cart[index].quantity == 1) {
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.totalPrice = 99999;
    },
  },
});

export const { createCartItem, increase, decrease, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
