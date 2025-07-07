interface ShopFormHeaderProps {
  isEdit: boolean;
}

const ShopFormHeader = ({ isEdit }: ShopFormHeaderProps) => {
  return (
    <div className="mb-6 sm:mb-6">
      <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-2">
        {isEdit ? 'Modifier ma boutique' : 'Créer ma boutique'}
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        {isEdit ? 'Mettez à jour les informations de votre boutique' : 'Configurez votre boutique en ligne en quelques étapes simples'}
      </p>
    </div>
  );
};

export default ShopFormHeader;
