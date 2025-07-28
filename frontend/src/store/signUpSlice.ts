import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SignUpFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'buyer' | 'seller';
}

interface SignUpAlert {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface SignUpState {
  formData: SignUpFormData;
  loading: boolean;
  alert: SignUpAlert;
  termsAccepted: boolean;
}

const initialState: SignUpState = {
  formData: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer',
  },
  loading: false,
  alert: { show: false, type: 'success', title: '', message: '' },
  termsAccepted: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpFormData(state, action: PayloadAction<SignUpFormData>) {
      state.formData = action.payload;
    },
    setSignUpLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSignUpAlert(state, action: PayloadAction<SignUpAlert>) {
      state.alert = action.payload;
    },
    setSignUpTermsAccepted(state, action: PayloadAction<boolean>) {
      state.termsAccepted = action.payload;
    },
  },
});

export const {
  setSignUpFormData,
  setSignUpLoading,
  setSignUpAlert,
  setSignUpTermsAccepted,
} = signUpSlice.actions;
export default signUpSlice.reducer;
