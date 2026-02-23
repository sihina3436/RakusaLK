import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};

const calculateTotals = (state) => {
  state.selectedItems = state.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.products.find(
        (p) =>
          p._id === action.payload._id &&
          p.size === action.payload.size
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { id, size, type } = action.payload;

      state.products.forEach((p) => {
        if (p._id === id && p.size === size) {
          if (type === "inc") p.quantity += 1;
          if (type === "dec" && p.quantity > 1) p.quantity -= 1;
        }
      });

      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      state.products = state.products.filter(
        (p) => !(p._id === id && p.size === size)
      );

      calculateTotals(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
