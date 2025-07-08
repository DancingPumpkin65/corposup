import { type StoreFormData } from '@/components/Seller/Shops/types';

interface ShopPreviewProps {
  formData: StoreFormData;
  previewImage: string;
}

const ShopPreview = ({ formData, previewImage }: ShopPreviewProps) => {
  return (
    <div className="w-110 bg-white pb-8 pt-0 px-4 xl:pl-0 sm:pt-0 xl:pt-8">
      <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Aperçu de votre boutique
        </h3>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
          {/* Store Image */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Store" 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-3 sm:p-4">
            {/* Store Name */}
            <div className="flex items-center mb-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                    formData.store_status === 'published' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {formData.store_status === 'published' ? 'Publié' : 'Masqué'}
                  </span>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {formData.store_name || 'Nom de votre boutique'}
                  </h4>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                {formData.store_description || 'Description de votre boutique apparaîtra ici...'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
              <div>
                <div className="font-semibold text-gray-900">0</div>
                <div className="text-gray-500">Produits</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">0</div>
                <div className="text-gray-500">Commandes</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">0</div>
                <div className="text-gray-500">Avis</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
          <p className="text-xs text-blue-600">
            💡 Cet aperçu montre comment votre boutique apparaîtra aux clients
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopPreview;
