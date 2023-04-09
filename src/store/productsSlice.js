import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState = {
  products,
  curProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurProduct: (state, action) => {
      const productId = action.payload;
      state.curProduct = state.products.find(
        (product) => product.id === productId
      );
    },
  },
});

// custom selectors
export const selectCurProduct = (state) => state.products.curProduct;

export const { setCurProduct } = productsSlice.actions;

export default productsSlice.reducer;
