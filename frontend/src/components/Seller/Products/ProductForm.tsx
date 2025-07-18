import React from 'react';
import type { CategoryOption, ProductFormProps } from '@/components/Seller/Products/types';
import {
    FormHeader,
    BasicInfoSection,
    DetailsSection,
    PricingSection,
    MediaSection,
    FormActions,
    ProductPreview
} from '@/components/Seller/Products/Form';

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  onFieldChange,
  onSelectChange,
  onKeywordChange,
  onPriceTierChange,
  addPriceTier,
  onFileChange,
  removeImage,
  setMainImage,
  onSubmit,
  onCancel,
  loading,
  isEdit = false,
  categories,
  units,
  stores,
  shippings,
}) => {

  const groupedCategories = categories.reduce((acc, category) => {
    const group = category.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  }, {} as Record<string, CategoryOption[]>);

  const mainImage = formData.images.find(img => img.is_main)?.preview;

  return (
    <div>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 sm:p-6">
                        <div className="max-w-full">
                            <FormHeader isEdit={isEdit} />
                            <form onSubmit={onSubmit}>
                                <BasicInfoSection
                                    formData={formData}
                                    onFieldChange={onFieldChange}
                                    onSelectChange={onSelectChange}
                                    groupedCategories={groupedCategories}
                                />
                                <DetailsSection
                                    formData={formData}
                                    onFieldChange={onFieldChange}
                                    onKeywordChange={onKeywordChange}
                                />
                                <PricingSection
                                    formData={formData}
                                    onFieldChange={onFieldChange}
                                    onSelectChange={onSelectChange}
                                    onPriceTierChange={onPriceTierChange}
                                    addPriceTier={addPriceTier}
                                    units={units}
                                    stores={stores}
                                />
                                <MediaSection
                                    formData={formData}
                                    onFieldChange={onFieldChange}
                                    onSelectChange={onSelectChange}
                                    onFileChange={onFileChange}
                                    removeImage={removeImage}
                                    setMainImage={setMainImage}
                                    shippings={shippings}
                                />
                                <FormActions
                                    onCancel={onCancel}
                                    loading={loading}
                                    isEdit={isEdit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <ProductPreview formData={formData} mainImage={mainImage} />
        </div>
    </div>
  );
};

export default ProductForm;
