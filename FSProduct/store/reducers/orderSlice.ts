import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";

interface OrderState {
  orders: IOrder[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<IOrder[]>) => {
      state.orders = payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
