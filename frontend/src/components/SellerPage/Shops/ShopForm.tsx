import { Upload } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import { Label } from '@/components/Shadcn/Label';
import InputField from '@/components/SellerPage/Shops/InputField';
import SelectField from '@/components/SellerPage/Shops/SelectField';
import ShopAlerts from '@/components/SellerPage/Shops/ShopAlerts';
import { type ShopFormProps } from '@/components/SellerPage/Shops/types';

const ShopForm = ({ 
  formData, 
  onFieldChange, 
  onFileChange,
  onSelectChange,
  onSubmit, 
  loading, 
  isEdit = false,
  onCancel,
  alert,
  previewImages
}: ShopFormProps) => {
  const statusOptions = [
    { value: 'published', label: 'Publié' },
    { value: 'hidden', label: 'Masqué' }
  ];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col xl:flex-row">
        {/* Form Section */}
        <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 sm:p-6">
              <div className="max-w-full">
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {isEdit ? 'Modifier ma boutique' : 'Créer ma boutique'}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    {isEdit ? 'Mettez à jour les informations de votre boutique' : 'Configurez votre boutique en ligne en quelques étapes simples'}
                  </p>
                </div>

                <ShopAlerts alert={alert} />

                <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                  <InputField
                    id="store_name"
                    name="store_name"
                    label="Nom de la boutique"
                    value={formData.store_name}
                    onChange={(value) => onFieldChange('store_name', value)}
                    placeholder="Entrez le nom de votre boutique"
                    autocomplete="organization"
                    required
                  />

                  <InputField
                    id="store_description"
                    name="store_description"
                    label="Description de la boutique"
                    value={formData.store_description}
                    onChange={(value) => onFieldChange('store_description', value)}
                    placeholder="Décrivez votre boutique, vos produits et services..."
                    required
                    isTextarea
                    rows={4}
                  />

                  <SelectField
                    id="store_status"
                    name="store_status"
                    label="Statut de la boutique"
                    value={formData.store_status}
                    onChange={(value) => onSelectChange('store_status', value)}
                    placeholder="Sélectionnez le statut"
                    options={statusOptions}
                    required
                  />

                  {/* Store Image Upload */}
                  <div>
                    <Label htmlFor={isEdit ? "store_image_edit" : "store_image"} className="text-sm sm:text-base">
                      Image de la boutique
                    </Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id={isEdit ? "store_image_edit" : "store_image"}
                        name={isEdit ? "store_image_edit" : "store_image"}
                        accept="image/*"
                        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor={isEdit ? "store_image_edit" : "store_image"} className="cursor-pointer">
                        {previewImages.store_image ? (
                          <div className="flex items-center justify-center">
                            <img 
                              src={previewImages.store_image} 
                              alt="Store preview" 
                              className="w-full h-24 sm:h-32 object-cover rounded-lg max-w-xs mx-auto"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                            <span className="text-xs sm:text-sm text-gray-600">Cliquez pour choisir une image</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.store_name || !formData.store_description}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
                    >
                      {loading ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer la boutique')}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-110 bg-white py-8 px-4 sm:pl-0">
          <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Aperçu de votre boutique
            </h3>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
              {/* Store Image */}
              <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                {previewImages.store_image && (
                  <img 
                    src={previewImages.store_image} 
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
      </div>
    </div>
  );
};

export default ShopForm;
