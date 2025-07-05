import { Truck } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import InputField from '@/components/SellerPage/Deliveries/InputField';
import DeliveryAlerts from '@/components/SellerPage/Deliveries/DeliveryAlerts';
import { type DeliveryFormProps } from '@/components/SellerPage/Deliveries/types';

const DeliveryForm = ({ 
  formData, 
  onFieldChange, 
  onSubmit, 
  loading, 
  isEdit = false,
  onCancel,
  alert
}: DeliveryFormProps) => {
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
                    {isEdit ? 'Modifier le service de livraison' : 'Créer un service de livraison'}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    {isEdit ? 'Mettez à jour les informations de votre service' : 'Configurez un nouveau service de livraison pour vos clients'}
                  </p>
                </div>

                <DeliveryAlerts alert={alert} />

                <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                  <InputField
                    id="shipping_name"
                    label="Nom du service"
                    value={formData.shipping_name}
                    onChange={(value) => onFieldChange('shipping_name', value)}
                    placeholder="Ex: Livraison express"
                    required
                  />

                  <InputField
                    id="shipping_description"
                    label="Description"
                    value={formData.shipping_description}
                    onChange={(value) => onFieldChange('shipping_description', value)}
                    placeholder="Décrivez votre service de livraison..."
                    required
                    isTextarea
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <InputField
                      id="shipping_cost"
                      label="Coût de livraison (DH)"
                      value={formData.shipping_cost}
                      onChange={(value) => onFieldChange('shipping_cost', value)}
                      placeholder="0.00"
                      required
                      type="number"
                      step="0.01"
                      min="0"
                    />

                    <InputField
                      id="shipping_delivery_time"
                      label="Délai de livraison (jours)"
                      value={formData.shipping_delivery_time}
                      onChange={(value) => onFieldChange('shipping_delivery_time', value)}
                      placeholder="1"
                      required
                      type="number"
                      min="1"
                    />
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
                      disabled={loading || !formData.shipping_name || !formData.shipping_description || !formData.shipping_cost || !formData.shipping_delivery_time}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
                    >
                      {loading ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer le service')}
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
              Aperçu du service
            </h3>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
              <div className="p-4">
                {/* Service Header */}
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[200px]" title={formData.shipping_name || 'Nom du service'}>
                      {formData.shipping_name || 'Nom du service'}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px]" title={formData.shipping_description || 'Description du service apparaîtra ici...'}>
                    {formData.shipping_description || 'Description du service apparaîtra ici...'}
                  </p>
                </div>

                {/* Pricing & Time */}
                <div className="grid grid-cols-2 gap-4 text-center text-xs sm:text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold text-gray-900 truncate max-w-[80px] mx-auto" title={formData.shipping_cost ? `${formData.shipping_cost} DH` : '0.00 DH'}>
                      {formData.shipping_cost ? `${formData.shipping_cost} DH` : '0.00 DH'}
                    </div>
                    <div className="text-gray-500">Coût</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold text-gray-900 truncate max-w-[80px] mx-auto" title={formData.shipping_delivery_time ? `${formData.shipping_delivery_time} jour${parseInt(formData.shipping_delivery_time) > 1 ? 's' : ''}` : '1 jour'}>
                      {formData.shipping_delivery_time ? `${formData.shipping_delivery_time} jour${parseInt(formData.shipping_delivery_time) > 1 ? 's' : ''}` : '1 jour'}
                    </div>
                    <div className="text-gray-500">Délai</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
              <p className="text-xs text-blue-600 truncate" title="💡 Cet aperçu montre comment votre service apparaîtra aux clients">
                💡 Cet aperçu montre comment votre service apparaîtra aux clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
