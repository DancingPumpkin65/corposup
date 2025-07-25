import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Products, SelectOption, CategoryOption } from "@/components/Seller/Products/types";

interface ProductsState {
  products: Products[];
  loading: boolean;
  creating: boolean;
  showCreateForm: boolean;
  showEditForm: boolean;
  editingProduct: Products | null;
  deleteDialogOpen: boolean;
  productToDelete: Products | null;
  formData: Products;
  categories: CategoryOption[];
  units: SelectOption[];
  stores: SelectOption[];
  shippings: SelectOption[];
}

const initialProduct: Products = {
  id: 0,
  seller_id: 1,
  store_id: 0,
  category_id: 0,
  unit_id: 0,
  product_name: '',
  product_ref: '',
  product_description: '',
  product_price: 0,
  product_stock: 0,
  product_minimum_commande: 1,
  product_status: 'draft',
  video_path: '',
  video_description: '',
  key_words: ['', '', '', ''],
  sale_type: 'unit',
  price_tiers: [{ min_quantity: 0, max_quantity: 0, price: 0 }],
  shipping_ids: [],
  color: '',
  material: '',
  brand: '',
  GTIN: '',
  MPN: '',
  images: [],
};

const initialState: ProductsState = {
  products: [],
  loading: true,
  creating: false,
  showCreateForm: false,
  showEditForm: false,
  editingProduct: null,
  deleteDialogOpen: false,
  productToDelete: null,
  formData: initialProduct,
  categories: [],
  units: [],
  stores: [],
  shippings: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Products[]>) {
      state.products = action.payload;
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
    setEditingProduct(state, action: PayloadAction<Products | null>) {
      state.editingProduct = action.payload;
    },
    setDeleteDialogOpen(state, action: PayloadAction<boolean>) {
      state.deleteDialogOpen = action.payload;
    },
    setProductToDelete(state, action: PayloadAction<Products | null>) {
      state.productToDelete = action.payload;
    },
    setFormData(state, action: PayloadAction<Products>) {
      state.formData = action.payload;
    },
    setCategories(state, action: PayloadAction<CategoryOption[]>) {
      state.categories = action.payload;
    },
    setUnits(state, action: PayloadAction<SelectOption[]>) {
      state.units = action.payload;
    },
    setStores(state, action: PayloadAction<SelectOption[]>) {
      state.stores = action.payload;
    },
    setShippings(state, action: PayloadAction<SelectOption[]>) {
      state.shippings = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setCreating,
  setShowCreateForm,
  setShowEditForm,
  setEditingProduct,
  setDeleteDialogOpen,
  setProductToDelete,
  setFormData,
  setCategories,
  setUnits,
  setStores,
  setShippings,
} = productsSlice.actions;
export default productsSlice.reducer;
