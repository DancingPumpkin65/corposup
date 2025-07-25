import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Discount } from "@/components/Seller/Discounts/types";

interface DiscountsState {
  discounts: Discount[];
  showForm: boolean;
  loading: boolean;
  editingDiscount: Discount | null;
}

const initialState: DiscountsState = {
  discounts: [],
  showForm: false,
  loading: false,
  editingDiscount: null,
};

export const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setDiscounts(state, action: PayloadAction<Discount[]>) {
      state.discounts = action.payload;
    },
    setShowForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setEditingDiscount(state, action: PayloadAction<Discount | null>) {
      state.editingDiscount = action.payload;
    },
  },
});

export const {
  setDiscounts,
  setShowForm,
  setLoading,
  setEditingDiscount,
} = discountsSlice.actions;
export default discountsSlice.reducer;
