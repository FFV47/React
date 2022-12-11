import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  isLoading: boolean;
}

export interface CartItemType {
  id: string;
  title: string;
  price: number;
  img: string;
  amount: number;
}

interface TogglePayload {
  payload: {
    id: string;
    type: string;
  };
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    toggle: (state: CartState, { payload }: TogglePayload) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === payload.id
      ) as CartItemType;
      if (payload.type === "increase") {
        cartItem.amount += 1;
        cartItem.amount = cartItem.amount > 10 ? 10 : cartItem.amount;
      } else {
        cartItem.amount -= 1;
        cartItem.amount = cartItem.amount < 0 ? 0 : cartItem.amount;
      }
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, toggle, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;
