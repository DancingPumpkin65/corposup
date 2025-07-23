import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  loading: boolean;
  editQty: { [id: number]: number };
  showUpdate: { [id: number]: boolean };
}

const initialState: CartState = {
  loading: false,
  editQty: {},
  showUpdate: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setEditQty(state, action: PayloadAction<{ id: number; value: number }>) {
      state.editQty[action.payload.id] = action.payload.value;
    },
    setShowUpdate(state, action: PayloadAction<{ id: number; value: boolean }>) {
      state.showUpdate[action.payload.id] = action.payload.value;
    },
    // Optionally add reset actions if needed
  },
});

export const { setLoading, setEditQty, setShowUpdate } = cartSlice.actions;
export default cartSlice.reducer;
