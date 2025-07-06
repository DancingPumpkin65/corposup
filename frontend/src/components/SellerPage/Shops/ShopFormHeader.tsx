interface ShopFormHeaderProps {
  isEdit: boolean;
}

const ShopFormHeader = ({ isEdit }: ShopFormHeaderProps) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {isEdit ? 'Modifier ma boutique' : 'Créer ma boutique'}
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        {isEdit ? 'Mettez à jour les informations de votre boutique' : 'Configurez votre boutique en ligne en quelques étapes simples'}
      </p>
    </div>
  );
};

export default ShopFormHeader;
