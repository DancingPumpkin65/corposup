import { useCallback, useEffect } from 'react';
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
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
} from "@/store/productsSlice";
import type { Products, PriceTier, SelectOption, CategoryOption, ProductImage } from '@/components/Seller/Products/types';

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

// Mock data for selects
const mockCategories: CategoryOption[] = [
    { value: 11, label: "Agriculture et élevage", group: "Agriculture et alimentation" },
    { value: 12, label: "Alimentation", group: "Agriculture et alimentation" },
    { value: 16, label: "Machine et matériel", group: "Machine et outils" },
    { value: 17, label: "Outils et quincaillerie", group: "Machine et outils" },
];
const mockUnits: SelectOption[] = [
    { value: 1, label: "Baril" },
    { value: 2, label: "Douzaine" },
    { value: 3, label: "Gramme" },
];
const mockStores: SelectOption[] = [
    { value: 56, label: "dasdadasdasdas" }
];
const mockShippings: SelectOption[] = [
    { value: 59, label: "dasdsa" }
];


export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const creating = useSelector((state: RootState) => state.products.creating);
  const showCreateForm = useSelector((state: RootState) => state.products.showCreateForm);
  const showEditForm = useSelector((state: RootState) => state.products.showEditForm);
  const editingProduct = useSelector((state: RootState) => state.products.editingProduct);
  const deleteDialogOpen = useSelector((state: RootState) => state.products.deleteDialogOpen);
  const productToDelete = useSelector((state: RootState) => state.products.productToDelete);
  const formData = useSelector((state: RootState) => state.products.formData);
  const categories = useSelector((state: RootState) => state.products.categories);
  const units = useSelector((state: RootState) => state.products.units);
  const stores = useSelector((state: RootState) => state.products.stores);
  const shippings = useSelector((state: RootState) => state.products.shippings);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        dispatch(setCategories(mockCategories));
        dispatch(setUnits(mockUnits));
        dispatch(setStores(mockStores));
        dispatch(setShippings(mockShippings));
        dispatch(setLoading(false));
    }, 500);
  }, [dispatch]);


  const resetForm = useCallback(() => {
    // Revoke object URLs to prevent memory leaks
    formData.images.forEach(image => URL.revokeObjectURL(image.preview));
    dispatch(setFormData(initialProduct));
  }, [formData.images, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.key_words];
    newKeywords[index] = value;
    dispatch(setFormData({ ...formData, key_words: newKeywords }));
  };

  const handlePriceTierChange = (index: number, field: keyof PriceTier, value: string) => {
    const newPriceTiers = [...formData.price_tiers];
    newPriceTiers[index] = { ...newPriceTiers[index], [field]: Number(value) };
    dispatch(setFormData({ ...formData, price_tiers: newPriceTiers }));
  };

  const addPriceTier = () => {
    dispatch(setFormData({
        ...formData,
        price_tiers: [...formData.price_tiers, { min_quantity: 0, max_quantity: 0, price: 0 }]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages: ProductImage[] = files.map((file, index) => ({
        file,
        is_main: formData.images.length === 0 && index === 0, // Make first image main if no images exist
        preview: URL.createObjectURL(file),
      }));

      dispatch(setFormData({ ...formData, images: [...formData.images, ...newImages] }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = formData.images[indexToRemove];
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(imageToRemove.preview);
    const newImages = formData.images.filter((_, index) => index !== indexToRemove);
    // If the removed image was the main one, set the first image as the new main
    if (imageToRemove.is_main && newImages.length > 0) {
      newImages[0].is_main = true;
    }
    dispatch(setFormData({ ...formData, images: newImages }));
  };

  const setMainImage = (indexToSet: number) => {
    const newImages = formData.images.map((image, index) => ({
      ...image,
      is_main: index === indexToSet,
    }));
    dispatch(setFormData({ ...formData, images: newImages }));
  };

  const handleCreate = () => {
    resetForm();
    dispatch(setShowCreateForm(true));
  };

  const handleEdit = (product: Products) => {
    dispatch(setFormData(product));
    dispatch(setEditingProduct(product));
    dispatch(setShowEditForm(true));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCreating(true));
    console.log("Creating product:", formData);
    setTimeout(() => {
      const newProduct = { ...formData, id: Date.now() };
      dispatch(setProducts([...products, newProduct]));
      dispatch(setCreating(false));
      dispatch(setShowCreateForm(false));
      resetForm();
      toast.success('Produit créé avec succès !');
    }, 3000);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    dispatch(setCreating(true));
    console.log("Updating product:", formData);
    setTimeout(() => {
      dispatch(setProducts(products.map(p => p.id === editingProduct.id ? formData : p)));
      dispatch(setCreating(false));
      dispatch(setShowEditForm(false));
      dispatch(setEditingProduct(null));
      resetForm();
      toast.success('Produit mis à jour avec succès !');
    }, 3000);
  };

  const handleDelete = (product: Products) => {
    dispatch(setProductToDelete(product));
    dispatch(setDeleteDialogOpen(true));
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setTimeout(() => {
        dispatch(setProducts(products.filter(p => p.id !== productToDelete.id)));
        dispatch(setDeleteDialogOpen(false));
        dispatch(setProductToDelete(null));
        toast.success('Produit supprimé avec succès.');
      }, 3000);
    }
  };

  return {
    products,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm: (v: boolean) => dispatch(setShowCreateForm(v)),
    showEditForm,
    setShowEditForm: (v: boolean) => dispatch(setShowEditForm(v)),
    setEditingProduct: (v: Products | null) => dispatch(setEditingProduct(v)),
    editingProduct,
    deleteDialogOpen,
    setDeleteDialogOpen: (v: boolean) => dispatch(setDeleteDialogOpen(v)),
    productToDelete,
    formData,
    categories,
    units,
    stores,
    shippings,
    handleInputChange,
    handleKeywordChange,
    handlePriceTierChange,
    addPriceTier,
    handleFileChange,
    removeImage,
    setMainImage,
    resetForm,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleUpdate,
    handleDelete,
    confirmDelete,
  };
};
