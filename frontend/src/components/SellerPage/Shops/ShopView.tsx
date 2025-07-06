import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import { type Store } from '@/components/SellerPage/Shops/types';

interface ShopViewProps {
  stores: Store[];
  onEdit: (store: Store) => void;
  onDelete: (store: Store) => void;
  getImageUrl: (imagePath?: string) => string;
}

const ShopView = ({ stores, onEdit, onDelete, getImageUrl }: ShopViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <div key={store.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
          {/* Store Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {store.store_image && (
              <img 
                src={getImageUrl(store.store_image)} 
                alt="Store" 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-4">
            {/* Store Info */}
            <div className="flex items-center mb-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                    store.store_status === 'published' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {store.store_status === 'published' ? 'Publié' : 'Masqué'}
                  </span>
                  <h3 className="font-semibold text-gray-900 truncate">{store.store_name}</h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {store.store_description || 'Aucune description fournie'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
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

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(store)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-1" />
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(store)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopView;
