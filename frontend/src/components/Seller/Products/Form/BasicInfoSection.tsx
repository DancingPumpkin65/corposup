import React from 'react';
import { FormSection } from '@/components/Seller/Products/Form/FormSection';
import { Input } from '@/components/Shadcn/Input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup, SelectLabel } from '@/components/Shadcn/Select';
import { Label } from '@/components/Shadcn/Label';
import { Textarea } from '@/components/Shadcn/Textarea';
import type { BasicInfoSectionProps } from '@/components/Seller/Products/types';

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onFieldChange, onSelectChange, groupedCategories }) => (
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
        <>
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
        </>
        <>
            <Label htmlFor="product_description">Description *</Label>
            <Textarea id="product_description" name="product_description" value={formData.product_description} onChange={onFieldChange} required />
        </>
    </FormSection>
);

export default BasicInfoSection;
