import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CompanyInfo {
  company_name: string;
  company_phone: string;
  sector: string;
  website: string;
  address1: string;
  address2: string;
  ice_number: string;
  legal_form: string;
  city: string;
  country: string;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

interface CompanyInfoState {
  formData: CompanyInfo;
  loading: boolean;
  dataLoaded: boolean;
  alert: AlertState;
  showWarning: boolean;
}

const initialState: CompanyInfoState = {
  formData: {
    company_name: '',
    company_phone: '',
    sector: '',
    website: '',
    address1: '',
    address2: '',
    ice_number: '',
    legal_form: '',
    city: '',
    country: '',
  },
  loading: false,
  dataLoaded: false,
  alert: { show: false, type: 'success', message: '' },
  showWarning: false,
};

export const companyInfoSlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    setCompanyFormData(state, action: PayloadAction<CompanyInfo>) {
      state.formData = action.payload;
    },
    setCompanyLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCompanyDataLoaded(state, action: PayloadAction<boolean>) {
      state.dataLoaded = action.payload;
    },
    setCompanyAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    setCompanyShowWarning(state, action: PayloadAction<boolean>) {
      state.showWarning = action.payload;
    },
  },
});

export const {
  setCompanyFormData,
  setCompanyLoading,
  setCompanyDataLoaded,
  setCompanyAlert,
  setCompanyShowWarning,
} = companyInfoSlice.actions;
export default companyInfoSlice.reducer;
