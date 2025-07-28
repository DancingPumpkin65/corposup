import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
  city: string;
  photo_profile?: File | null;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

interface ProfileInfoState {
  formData: ProfileInfo;
  loading: boolean;
  alert: AlertState;
  selectedImage: File | null;
}

const initialState: ProfileInfoState = {
  formData: {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    phone: '',
    city: '',
    photo_profile: null,
  },
  loading: false,
  alert: { show: false, type: 'success', message: '' },
  selectedImage: null,
};

export const profileInfoSlice = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {
    setProfileFormData(state, action: PayloadAction<ProfileInfo>) {
      state.formData = action.payload;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setProfileAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    setProfileSelectedImage(state, action: PayloadAction<File | null>) {
      state.selectedImage = action.payload;
    },
  },
});

export const {
  setProfileFormData,
  setProfileLoading,
  setProfileAlert,
  setProfileSelectedImage,
} = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
