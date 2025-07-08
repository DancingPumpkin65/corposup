import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';

interface FormHeaderProps {
    isEdit: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ isEdit }) => (
    <div>
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
    </div>
);

export default FormHeader;
