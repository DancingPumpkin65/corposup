import React from 'react';
import ProductCard from '@/components/SellerPage/Products/ProductCard';
import type { ProductPreviewProps } from '@/components/SellerPage/Products/types';

export const ProductPreview: React.FC<ProductPreviewProps> = ({ formData, mainImage }) => (
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
);

export default ProductPreview;
