import React from 'react';
import { Button } from '@/components/Shadcn/Button';
import type { FormActionsProps } from '@/components/Seller/Products/types';

export const FormActions: React.FC<FormActionsProps> = ({ onCancel, loading, isEdit }) => (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="w-full sm:w-auto order-2 sm:order-1">Annuler</Button>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white order-1 sm:order-2">
            {loading ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer le produit')}
        </Button>
    </div>
);

export default FormActions;
