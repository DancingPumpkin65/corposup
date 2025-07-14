import { type Product } from "@/components/ProductsPage/types";

const ProductPrice = ({ product }: { product: Product }) => (
  <>
    <div className="flex items-center gap-4 mb-2">
      <span className="text-3xl font-bold text-orange-600">
        {product.discount?.discount_active ? product.discount.new_price : product.product_price} DH
      </span>
      {product.discount?.discount_active && (
        <>
          <span className="text-lg line-through text-gray-400">{product.product_price} DH</span>
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs">
            {Math.round(product.discount.discount_value)}%
          </span>
        </>
      )}
    </div>
    <div className="text-lg text-gray-700 mb-8">
      <div className="mb-2"><span className="font-bold">Unit :</span> {product.unit_id}</div>
      <div className="mb-2"><span className="font-bold">Minimum number of units :</span> {product.product_minimum_commande}</div>
    </div>
  </>
);

export default ProductPrice;
