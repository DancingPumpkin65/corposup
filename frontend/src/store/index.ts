import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderHistoryReducer from "./orderHistorySlice";
// ...other imports...

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    // ...other reducers...
  },
  // ...middleware, etc...
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
