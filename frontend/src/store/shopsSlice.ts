import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Store, StoreFormData } from "@/components/Seller/Shops/types";

interface PreviewImages {
  store_image: string;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

interface ShopsState {
  stores: Store[];
  loading: boolean;
  creating: boolean;
  showCreateForm: boolean;
  showEditForm: boolean;
  editingStore: Store | null;
  deleteDialogOpen: boolean;
  storeToDelete: Store | null;
  formData: StoreFormData;
  previewImages: PreviewImages;
  alert: AlertState;
}

const initialState: ShopsState = {
  stores: [],
  loading: true,
  creating: false,
  showCreateForm: false,
  showEditForm: false,
  editingStore: null,
  deleteDialogOpen: false,
  storeToDelete: null,
  formData: {
    store_name: '',
    store_description: '',
    store_status: 'published',
    store_image: null,
  },
  previewImages: {
    store_image: '',
  },
  alert: {
    show: false,
    type: 'success',
    message: '',
  },
};

export const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setStores(state, action: PayloadAction<Store[]>) {
      state.stores = action.payload;
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
    setEditingStore(state, action: PayloadAction<Store | null>) {
      state.editingStore = action.payload;
    },
    setDeleteDialogOpen(state, action: PayloadAction<boolean>) {
      state.deleteDialogOpen = action.payload;
    },
    setStoreToDelete(state, action: PayloadAction<Store | null>) {
      state.storeToDelete = action.payload;
    },
    setFormData(state, action: PayloadAction<StoreFormData>) {
      state.formData = action.payload;
    },
    setPreviewImages(state, action: PayloadAction<PreviewImages>) {
      state.previewImages = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
  },
});

export const {
  setStores,
  setLoading,
  setCreating,
  setShowCreateForm,
  setShowEditForm,
  setEditingStore,
  setDeleteDialogOpen,
  setStoreToDelete,
  setFormData,
  setPreviewImages,
  setAlert,
} = shopsSlice.actions;
export default shopsSlice.reducer;
