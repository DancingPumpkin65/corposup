import React from 'react';
import ProductCard from '@/components/Seller/Products/ProductCard';
import type { ProductPreviewProps } from '@/components/Seller/Products/types';

export const ProductPreview: React.FC<ProductPreviewProps> = ({ formData, mainImage }) => (
    <div className="w-[400px] bg-white pb-8 pt-0 px-4 xl:pl-0 sm:pt-0 xl:pt-8">
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
