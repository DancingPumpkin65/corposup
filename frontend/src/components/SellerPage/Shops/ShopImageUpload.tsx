import { Upload } from 'lucide-react';
import { Label } from '@/components/Shadcn/Label';

interface ShopImageUploadProps {
  isEdit: boolean;
  onFileChange: (file: File | null) => void;
  previewImage: string;
}

const ShopImageUpload = ({ isEdit, onFileChange, previewImage }: ShopImageUploadProps) => {
  const inputId = isEdit ? "store_image_edit" : "store_image";

  return (
    <div>
      <Label htmlFor={inputId} className="text-sm sm:text-base">
        Image de la boutique
      </Label>
      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          id={inputId}
          name={inputId}
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        <label htmlFor={inputId} className="cursor-pointer">
          {previewImage ? (
            <div className="flex items-center justify-center">
              <img 
                src={previewImage} 
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
  );
};

export default ShopImageUpload;
