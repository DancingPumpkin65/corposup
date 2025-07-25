import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderHistoryReducer from "./orderHistorySlice";
import deliveriesReducer from "./deliveriesSlice";
import discountsReducer from "./discountsSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    deliveries: deliveriesReducer,
    discounts: discountsReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
