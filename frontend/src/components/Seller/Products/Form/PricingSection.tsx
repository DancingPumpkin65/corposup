import React from 'react';
import { PlusCircle } from 'lucide-react';
import { FormSection } from '@/components/Seller/Products/Form/FormSection';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/Shadcn/Select';
import { Button } from '@/components/Shadcn/Button';
import type { PricingSectionProps } from '@/components/Seller/Products/types';

export const PricingSection: React.FC<PricingSectionProps> = ({ formData, onFieldChange, onSelectChange, onPriceTierChange, addPriceTier, units, stores }) => (
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
);

export default PricingSection;
