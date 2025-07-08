import { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
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

const mockProducts: Products[] = [];

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
  const [products, setProducts] = useState<Products[]>(mockProducts);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Products | null>(null);
  const [formData, setFormData] = useState<Products>(initialProduct);

  // Data for selects
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [units, setUnits] = useState<SelectOption[]>([]);
  const [stores, setStores] = useState<SelectOption[]>([]);
  const [shippings, setShippings] = useState<SelectOption[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        setCategories(mockCategories);
        setUnits(mockUnits);
        setStores(mockStores);
        setShippings(mockShippings);
        setLoading(false);
    }, 500);
  }, []);


  const resetForm = useCallback(() => {
    // Revoke object URLs to prevent memory leaks
    formData.images.forEach(image => URL.revokeObjectURL(image.preview));
    setFormData(initialProduct);
  }, [formData.images]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.key_words];
    newKeywords[index] = value;
    setFormData(prev => ({ ...prev, key_words: newKeywords }));
  };

  const handlePriceTierChange = (index: number, field: keyof PriceTier, value: string) => {
    const newPriceTiers = [...formData.price_tiers];
    newPriceTiers[index] = { ...newPriceTiers[index], [field]: Number(value) };
    setFormData(prev => ({ ...prev, price_tiers: newPriceTiers }));
  };

  const addPriceTier = () => {
    setFormData(prev => ({
        ...prev,
        price_tiers: [...prev.price_tiers, { min_quantity: 0, max_quantity: 0, price: 0 }]
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

      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => {
        const imageToRemove = prev.images[indexToRemove];
        // Revoke the object URL to free up memory
        URL.revokeObjectURL(imageToRemove.preview);
        const newImages = prev.images.filter((_, index) => index !== indexToRemove);
        // If the removed image was the main one, set the first image as the new main
        if (imageToRemove.is_main && newImages.length > 0) {
            newImages[0].is_main = true;
        }
        return { ...prev, images: newImages };
    });
  };

  const setMainImage = (indexToSet: number) => {
    setFormData(prev => {
        const newImages = prev.images.map((image, index) => ({
            ...image,
            is_main: index === indexToSet,
        }));
        return { ...prev, images: newImages };
    });
  };

  const handleCreate = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const handleEdit = (product: Products) => {
    setFormData(product);
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    console.log("Creating product:", formData);
    setTimeout(() => {
      const newProduct = { ...formData, id: Date.now() };
      setProducts(prev => [...prev, newProduct]);
      setCreating(false);
      setShowCreateForm(false);
      resetForm();
      toast.success('Produit créé avec succès !');
    }, 1000);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setCreating(true);
    console.log("Updating product:", formData);
    setTimeout(() => {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? formData : p));
      setCreating(false);
      setShowEditForm(false);
      setEditingProduct(null);
      resetForm();
      toast.success('Produit mis à jour avec succès !');
    }, 1000);
  };

  const handleDelete = (product: Products) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success('Produit supprimé avec succès.');
    }
  };

  return {
    products,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm,
    showEditForm,
    setShowEditForm,
    setEditingProduct,
    editingProduct,
    deleteDialogOpen,
    setDeleteDialogOpen,
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
