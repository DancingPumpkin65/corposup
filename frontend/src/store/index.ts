import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderHistoryReducer from "./orderHistorySlice";
import deliveriesReducer from "./deliveriesSlice";
// ...other imports...

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    deliveries: deliveriesReducer,
    // ...other reducers...
  },
  // ...middleware, etc...
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
