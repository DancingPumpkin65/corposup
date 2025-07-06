import { Button } from '@/components/Shadcn/Button';

interface ShopFormButtonsProps {
  isEdit: boolean;
  loading: boolean;
  onCancel: () => void;
  isFormValid: boolean;
}

const ShopFormButtons = ({ isEdit, loading, onCancel, isFormValid }: ShopFormButtonsProps) => {
  return (
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
        disabled={loading || !isFormValid}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
      >
        {loading ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer la boutique')}
      </Button>
    </div>
  );
};

export default ShopFormButtons;
