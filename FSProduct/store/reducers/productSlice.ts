import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/IProduct";

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
