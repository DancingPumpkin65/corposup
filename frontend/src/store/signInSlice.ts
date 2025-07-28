import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInAlert {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface SignInState {
  formData: SignInFormData;
  loading: boolean;
  alert: SignInAlert;
  rememberMe: boolean;
}

const initialState: SignInState = {
  formData: { email: '', password: '' },
  loading: false,
  alert: { show: false, type: 'success', title: '', message: '' },
  rememberMe: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignInFormData(state, action: PayloadAction<SignInFormData>) {
      state.formData = action.payload;
    },
    setSignInLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSignInAlert(state, action: PayloadAction<SignInAlert>) {
      state.alert = action.payload;
    },
    setSignInRememberMe(state, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
  },
});

export const {
  setSignInFormData,
  setSignInLoading,
  setSignInAlert,
  setSignInRememberMe,
} = signInSlice.actions;
export default signInSlice.reducer;
