import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const inititalState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: inititalState,
});

// console.log(cartSlice);

export default cartSlice.reducer;
