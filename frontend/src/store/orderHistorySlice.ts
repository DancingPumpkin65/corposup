import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationState, SortingState } from "@tanstack/react-table";

type Order = {
  id: string;
  date: string;
  status: "En attente" | "Envoyée";
  total: string;
};

const mockOrders: Order[] = [
  { id: "ORD-001", date: "2024-06-01", status: "Envoyée", total: "49.99€" },
  { id: "ORD-002", date: "2024-05-28", status: "En attente", total: "19.99€" },
  { id: "ORD-003", date: "2024-05-15", status: "Envoyée", total: "29.99€" },
  { id: "ORD-004", date: "2024-05-10", status: "En attente", total: "99.99€" },
  { id: "ORD-005", date: "2024-04-30", status: "Envoyée", total: "15.00€" },
];

interface OrderHistoryState {
  loading: boolean;
  pagination: PaginationState;
  sorting: SortingState;
  data: Order[];
}

const initialState: OrderHistoryState = {
  loading: false,
  pagination: { pageIndex: 0, pageSize: 5 },
  sorting: [{ id: "date", desc: true }],
  data: mockOrders,
};

export const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    setOrderLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setOrderPagination(state, action: PayloadAction<PaginationState>) {
      state.pagination = action.payload;
    },
    setOrderSorting(state, action: PayloadAction<SortingState>) {
      state.sorting = action.payload;
    },
    setOrderData(state, action: PayloadAction<Order[]>) {
      state.data = action.payload;
    },
  },
});

export const {
  setOrderLoading,
  setOrderPagination,
  setOrderSorting,
  setOrderData,
} = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
