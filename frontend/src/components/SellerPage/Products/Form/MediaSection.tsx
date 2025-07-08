import React from 'react';
import { Star, X } from 'lucide-react';
import { FormSection } from '@/components/SellerPage/Products/Form/FormSection';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/Shadcn/Select';
import { Textarea } from '@/components/Shadcn/Textarea';
import { Button } from '@/components/Shadcn/Button';
import type { MediaSectionProps } from '@/components/SellerPage/Products/types';

export const MediaSection: React.FC<MediaSectionProps> = ({ formData, onFieldChange, onSelectChange, onFileChange, removeImage, setMainImage, shippings }) => (
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
);

export default MediaSection;
