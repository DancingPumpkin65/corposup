import React from 'react';
import { Button } from '@/components/Shadcn/Button';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Textarea } from '@/components/Shadcn/Textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/Shadcn/Select';
import type { Products, PriceTier, SelectOption, CategoryOption } from '@/components/SellerPage/Products/types';
import ProductCard from '@/components/SellerPage/Products/ProductCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { Info, PlusCircle, Star, X } from 'lucide-react';

// Helper component for consistent section styling
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4 border-t border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

interface ProductFormProps {
  formData: Products;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSelectChange: (name: string, value: string | number) => void;
  onKeywordChange: (index: number, value: string) => void;
  onPriceTierChange: (index: number, field: keyof PriceTier, value: string) => void;
  addPriceTier: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  setMainImage: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
  isEdit?: boolean;
  categories: CategoryOption[];
  units: SelectOption[];
  stores: SelectOption[];
  shippings: SelectOption[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  onFieldChange,
  onSelectChange,
  onKeywordChange,
  onPriceTierChange,
  addPriceTier,
  onFileChange,
  removeImage,
  setMainImage,
  onSubmit,
  onCancel,
  loading,
  isEdit = false,
  categories,
  units,
  stores,
  shippings,
}) => {

  const groupedCategories = categories.reduce((acc, category) => {
    const group = category.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  }, {} as Record<string, CategoryOption[]>);

  const mainImage = formData.images.find(img => img.is_main)?.preview;

  return (
    <div>
        <div className="flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 sm:p-6">
                    <div className="max-w-full">
                        <div className="mb-6 sm:mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {isEdit ? 'Modifier le produit' : 'Créer un nouveau produit'}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                {isEdit ? 'Mettez à jour les informations de votre produit' : 'Remplissez les informations pour créer un nouveau produit'}
                            </p>
                        </div>

                        <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-800 mb-6">
                            <Info className="h-4 w-4 text-blue-800" />
                            <AlertTitle className="font-medium">Alerte info !</AlertTitle>
                            <AlertDescription>
                            Les champs marqués d'une étoile (*) sont obligatoires.
                            </AlertDescription>
                        </Alert>
                    

                    <form onSubmit={onSubmit}>
                        <FormSection title="Informations de base">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-1">
                                <Label htmlFor="product_ref">Référence *</Label>
                                <Input id="product_ref" name="product_ref" value={formData.product_ref} onChange={onFieldChange} required />
                                </div>
                                <div className="sm:col-span-2">
                                <Label htmlFor="product_name">Nom du produit *</Label>
                                <Input id="product_name" name="product_name" value={formData.product_name} onChange={onFieldChange} required />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="category_id">Catégorie *</Label>
                                <Select name="category_id" onValueChange={(value) => onSelectChange('category_id', value)} value={String(formData.category_id)} required>
                                    <SelectTrigger><SelectValue placeholder="Sélectionnez la catégorie" /></SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(groupedCategories).map(([group, options]) => (
                                            <SelectGroup key={group}>
                                                <SelectLabel>{group}</SelectLabel>
                                                {options.map(option => (
                                                    <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="product_description">Description *</Label>
                                <Textarea id="product_description" name="product_description" value={formData.product_description} onChange={onFieldChange} required />
                            </div>
                        </FormSection>

                        <FormSection title="Mots-clés & Détails">
                            <div>
                                <Label htmlFor="keywords">Mots-clés *</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {formData.key_words.map((keyword, index) => (
                                    <Input key={index} name={`keyword_${index}`} value={keyword} onChange={(e) => onKeywordChange(index, e.target.value)} />
                                ))}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">Par exemple, pour une télévision : TV / TDT / Led / Full HD / Plasma / 40 pouces.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="color">Couleur</Label>
                                    <Input id="color" name="color" value={formData.color} onChange={onFieldChange} />
                                </div>
                                <div>
                                    <Label htmlFor="material">Matériaux</Label>
                                    <Input id="material" name="material" value={formData.material} onChange={onFieldChange} />
                                </div>
                                <div>
                                    <Label htmlFor="brand">Marque</Label>
                                    <Input id="brand" name="brand" value={formData.brand} onChange={onFieldChange} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="GTIN">Numéro mondial de l'article (GTIN)</Label>
                                    <Input id="GTIN" name="GTIN" value={formData.GTIN} onChange={onFieldChange} />
                                </div>
                                <div>
                                    <Label htmlFor="MPN">Numéro de référence du fabricant (MPN)</Label>
                                    <Input id="MPN" name="MPN" value={formData.MPN} onChange={onFieldChange} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Tarification & Stock">
                            <div>
                                <Label>Type de vente</Label>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    <Label className="flex items-center space-x-2"><input type="radio" name="sale_type" value="unit" checked={formData.sale_type === 'unit'} onChange={onFieldChange} className="form-radio"/><span>Prix unitaire</span></Label>
                                    <Label className="flex items-center space-x-2"><input type="radio" name="sale_type" value="quantity" checked={formData.sale_type === 'quantity'} onChange={onFieldChange} className="form-radio"/><span>Prix selon quantité</span></Label>
                                    <Label className="flex items-center space-x-2"><input type="radio" name="sale_type" value="negotiable" checked={formData.sale_type === 'negotiable'} onChange={onFieldChange} className="form-radio"/><span>Prix à convenir</span></Label>
                                </div>
                            </div>

                            {formData.sale_type === 'unit' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="product_price">Prix *</Label>
                                        <Input id="product_price" name="product_price" type="number" value={formData.product_price} onChange={onFieldChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="unit_id">Unité *</Label>
                                        <Select name="unit_id" onValueChange={(value) => onSelectChange('unit_id', value)} value={String(formData.unit_id)} required>
                                            <SelectTrigger><SelectValue placeholder="Sélectionnez l'unité" /></SelectTrigger>
                                            <SelectContent>
                                                {units.map(option => (
                                                    <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {formData.sale_type === 'quantity' && (
                                <div>
                                    <Label>Prix par paliers</Label>
                                    {formData.price_tiers.map((tier, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2 mt-2 items-center">
                                            <Input type="number" placeholder="De (Qté min)" name="min_quantity" value={tier.min_quantity} onChange={(e) => onPriceTierChange(index, 'min_quantity', e.target.value)} />
                                            <Input type="number" placeholder="À (Qté max)" name="max_quantity" value={tier.max_quantity} onChange={(e) => onPriceTierChange(index, 'max_quantity', e.target.value)} />
                                            <Input type="number" placeholder="Prix" name="price" value={tier.price} onChange={(e) => onPriceTierChange(index, 'price', e.target.value)} />
                                        </div>
                                    ))}
                                    <Button type="button" variant="ghost" size="sm" onClick={addPriceTier} className="mt-2"><PlusCircle className="h-4 w-4 mr-2"/>Ajouter un palier</Button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="store_id">Magasin *</Label>
                                    <Select name="store_id" onValueChange={(value) => onSelectChange('store_id', value)} value={String(formData.store_id)} required>
                                        <SelectTrigger><SelectValue placeholder="Sélectionnez le magasin" /></SelectTrigger>
                                        <SelectContent>
                                            {stores.map(option => (
                                                <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="product_stock">Quantité en stock</Label>
                                    <Input id="product_stock" name="product_stock" type="number" value={formData.product_stock} onChange={onFieldChange} />
                                </div>
                                <div>
                                    <Label htmlFor="product_minimum_commande">Commande minimum</Label>
                                    <Input id="product_minimum_commande" name="product_minimum_commande" type="number" value={formData.product_minimum_commande} onChange={onFieldChange} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Média & Livraison">
                            <div>
                                <Label htmlFor="shipping_ids">Informations sur la livraison</Label>
                                <Select name="shipping_ids" onValueChange={(value) => onSelectChange('shipping_ids', value)} value={String(formData.shipping_ids[0] || '')}>
                                    <SelectTrigger><SelectValue placeholder="Sélectionnez le service de livraison" /></SelectTrigger>
                                    <SelectContent>
                                        {shippings.map(option => (
                                            <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="video_path">Vidéo (URL)</Label>
                                <Input id="video_path" name="video_path" type="url" value={formData.video_path} onChange={onFieldChange} />
                            </div>
                            <div>
                                <Label htmlFor="video_description">Description vidéo</Label>
                                <Textarea id="video_description" name="video_description" value={formData.video_description} onChange={onFieldChange} />
                            </div>
                            <div>
                                <Label htmlFor="images">Images du produit</Label>
                                <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                                    <p className="text-gray-500 mb-4">Glissez une image ici ou</p>
                                    <Label htmlFor="image-upload" className="bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-orange-600">Choisir un fichier</Label>
                                    <Input id="image-upload" type="file" multiple onChange={onFileChange} className="hidden" accept="image/*" />
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img src={image.preview} alt={`Aperçu ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                                            {image.is_main && <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">Main</div>}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button type="button" size="icon" variant="ghost" onClick={() => setMainImage(index)} className="text-white hover:text-yellow-400" title="Set as main">
                                                    <Star className="h-5 w-5" />
                                                </Button>
                                                <Button type="button" size="icon" variant="ghost" onClick={() => removeImage(index)} className="text-white hover:text-red-500" title="Remove">
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FormSection>

                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="w-full sm:w-auto order-2 sm:order-1">Annuler</Button>
                            <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white order-1 sm:order-2">
                                {loading ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer le produit')}
                            </Button>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="w-110 bg-white py-8 px-4 sm:pl-0">
                <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                        Aperçu du produit
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm border">
                        <ProductCard product={formData} previewImage={mainImage} />
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-600">
                            💡 Cet aperçu montre comment votre produit apparaîtra aux clients.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductForm;
