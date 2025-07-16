import { type Product } from "@/components/ProductsPage/types";

const ProductPrice = ({ product }: { product: Product }) => (
  <>
    <div className="flex items-center gap-4 mb-8">
      <span className="text-4xl font-semibold text-orange-600">
        {product.discount?.discount_active ? product.discount.new_price : product.product_price} MAD
      </span>
      {product.discount?.discount_active && (
        <>
          <span className="text-3xl line-through text-gray-400">{product.product_price} </span>
        </>
      )}
    </div>
  </>
);

export default ProductPrice;
