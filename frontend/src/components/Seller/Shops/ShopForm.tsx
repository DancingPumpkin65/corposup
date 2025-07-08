import { Info } from 'lucide-react';
import InputField from '@/components/Seller/Shops/InputField';
import SelectField from '@/components/Seller/Shops/SelectField';
import ShopAlerts from '@/components/Seller/Shops/ShopAlerts';
import ShopFormHeader from '@/components/Seller/Shops/ShopFormHeader';
import ShopImageUpload from '@/components/Seller/Shops/ShopImageUpload';
import ShopFormButtons from '@/components/Seller/Shops/ShopFormButtons';
import ShopPreview from '@/components/Seller/Shops/ShopPreview';
import { type ShopFormProps } from '@/components/Seller/Shops/types';
import { Alert, AlertTitle, AlertDescription } from '@/components/Shadcn/Alert';

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

  const isFormValid = !!(formData.store_name && formData.store_description);

  return (
    <div>
      <div className="flex flex-col xl:flex-row">
        {/* Form Section */}
        <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 sm:p-6">
              <div className="max-w-full">
                <ShopFormHeader isEdit={isEdit} />

                <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-800 mb-6">
                    <Info className="h-4 w-4 text-blue-800" />
                    <AlertTitle className="font-medium">Alerte info !</AlertTitle>
                    <AlertDescription>
                    Les champs marqués d'une étoile (*) sont obligatoires.
                    </AlertDescription>
                </Alert>

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

                  <ShopImageUpload
                    isEdit={isEdit}
                    onFileChange={onFileChange}
                    previewImage={previewImages.store_image}
                  />

                  <ShopFormButtons
                    isEdit={isEdit}
                    loading={loading}
                    onCancel={onCancel}
                    isFormValid={isFormValid}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <ShopPreview 
          formData={formData} 
          previewImage={previewImages.store_image} 
        />
      </div>
    </div>
  );
};

export default ShopForm;
