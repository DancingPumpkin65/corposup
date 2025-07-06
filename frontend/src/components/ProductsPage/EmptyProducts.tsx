import emptyProduct from '@/assets/EmptyProduct.svg';

const EmptyProducts = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="text-center flex flex-col">
        <img src={emptyProduct} alt="No products" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg mt-4 font-semibold">Aucun produit disponible</p>
      </div>
    </div>
  );
};

export default EmptyProducts;
