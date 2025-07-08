import React from 'react';
import { FormSection } from '@/components/Seller/Products/Form/FormSection';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import type { DetailsSectionProps } from '@/components/Seller/Products/types';

export const DetailsSection: React.FC<DetailsSectionProps> = ({ formData, onFieldChange, onKeywordChange }) => (
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
);

export default DetailsSection;
