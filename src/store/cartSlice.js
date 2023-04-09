import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  shippingCost: 100,
  freeShippingOver: 20000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === newProduct.id
      );

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    updateCartItem: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId
      );

      if (cartItem) {
        cartItem.quantity += amount;
      }

      if (cartItem.quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId
        );
      }
    },
  },
});

// custom selectors
export const selectNumCartItems = (state) => state.cart.items.length;
export const selectAllCartItems = (state) => state.cart.items;
export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

const selectCart = (state) => state.cart;
export const selectShippingCost = createSelector(
  selectSubtotal,
  selectCart,
  (subtotal, cart) => (subtotal > cart.freeShippingOver ? 0 : cart.shippingCost)
);
export const selectTotal = createSelector(
  selectSubtotal,
  selectShippingCost,
  (subtotal, shippingCost) => subtotal + shippingCost
);

export const { addCartItem, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
