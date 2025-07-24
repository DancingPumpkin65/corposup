import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ShippingService, type ShippingFormData, type AlertState } from "@/components/Seller/Deliveries/types";

interface DeliveriesState {
  services: ShippingService[];
  loading: boolean;
  creating: boolean;
  showCreateForm: boolean;
  showEditForm: boolean;
  editingService: ShippingService | null;
  deleteDialogOpen: boolean;
  serviceToDelete: ShippingService | null;
  alert: AlertState;
  formData: ShippingFormData;
}

const initialState: DeliveriesState = {
  services: [],
  loading: true,
  creating: false,
  showCreateForm: false,
  showEditForm: false,
  editingService: null,
  deleteDialogOpen: false,
  serviceToDelete: null,
  alert: {
    show: false,
    type: 'success',
    message: ''
  },
  formData: {
    shipping_name: '',
    shipping_description: '',
    shipping_cost: '',
    shipping_delivery_time: ''
  }
};

export const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<ShippingService[]>) {
      state.services = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCreating(state, action: PayloadAction<boolean>) {
      state.creating = action.payload;
    },
    setShowCreateForm(state, action: PayloadAction<boolean>) {
      state.showCreateForm = action.payload;
    },
    setShowEditForm(state, action: PayloadAction<boolean>) {
      state.showEditForm = action.payload;
    },
    setEditingService(state, action: PayloadAction<ShippingService | null>) {
      state.editingService = action.payload;
    },
    setDeleteDialogOpen(state, action: PayloadAction<boolean>) {
      state.deleteDialogOpen = action.payload;
    },
    setServiceToDelete(state, action: PayloadAction<ShippingService | null>) {
      state.serviceToDelete = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    setFormData(state, action: PayloadAction<ShippingFormData>) {
      state.formData = action.payload;
    },
  },
});

export const {
  setServices,
  setLoading,
  setCreating,
  setShowCreateForm,
  setShowEditForm,
  setEditingService,
  setDeleteDialogOpen,
  setServiceToDelete,
  setAlert,
  setFormData,
} = deliveriesSlice.actions;
export default deliveriesSlice.reducer;
