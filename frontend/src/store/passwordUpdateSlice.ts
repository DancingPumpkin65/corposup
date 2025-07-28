import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

interface PasswordUpdateState {
  formData: PasswordData;
  loading: boolean;
  alert: AlertState;
}

const initialState: PasswordUpdateState = {
  formData: {
    current_password: '',
    password: '',
    password_confirmation: '',
  },
  loading: false,
  alert: { show: false, type: 'success', message: '' },
};

export const passwordUpdateSlice = createSlice({
  name: "passwordUpdate",
  initialState,
  reducers: {
    setPasswordFormData(state, action: PayloadAction<PasswordData>) {
      state.formData = action.payload;
    },
    setPasswordLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPasswordAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    resetPasswordForm(state) {
      state.formData = {
        current_password: '',
        password: '',
        password_confirmation: '',
      };
    },
  },
});

export const {
  setPasswordFormData,
  setPasswordLoading,
  setPasswordAlert,
  resetPasswordForm,
} = passwordUpdateSlice.actions;
export default passwordUpdateSlice.reducer;
