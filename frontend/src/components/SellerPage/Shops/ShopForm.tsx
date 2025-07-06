import InputField from '@/components/SellerPage/Shops/InputField';
import SelectField from '@/components/SellerPage/Shops/SelectField';
import ShopAlerts from '@/components/SellerPage/Shops/ShopAlerts';
import ShopFormHeader from '@/components/SellerPage/Shops/ShopFormHeader';
import ShopImageUpload from '@/components/SellerPage/Shops/ShopImageUpload';
import ShopFormButtons from '@/components/SellerPage/Shops/ShopFormButtons';
import ShopPreview from '@/components/SellerPage/Shops/ShopPreview';
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

  const isFormValid = !!(formData.store_name && formData.store_description);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col xl:flex-row">
        {/* Form Section */}
        <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 sm:p-6">
              <div className="max-w-full">
                <ShopFormHeader isEdit={isEdit} />

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
