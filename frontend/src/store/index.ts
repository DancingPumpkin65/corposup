import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderHistoryReducer from "./orderHistorySlice";
import deliveriesReducer from "./deliveriesSlice";
import discountsReducer from "./discountsSlice";
import productsReducer from "./productsSlice";
import signInReducer from "./signInSlice";
import signUpReducer from "./signUpSlice";
import profileInfoReducer from "./profileInfoSlice";
import companyInfoReducer from "./companyInfoSlice";
import passwordUpdateReducer from "./passwordUpdateSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    deliveries: deliveriesReducer,
    discounts: discountsReducer,
    products: productsReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    profileInfo: profileInfoReducer,
    companyInfo: companyInfoReducer,
    passwordUpdate: passwordUpdateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
