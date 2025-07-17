import { type Product } from "@/components/ProductsPage/types";

const ProductPrice = ({ product }: { product: Product }) => (
  <>
    <div className="flex flex-col items-start mb-8">
      {product.discount?.discount_active && (
        <>
          <span className="text-2xl line-through text-gray-400">{product.product_price} MAD</span>
        </>
      )}
      <span className="text-4xl flex justify-center items-center font-semibold text-orange-600">
        {product.discount?.discount_active ? product.discount.new_price : product.product_price} MAD
        <div className="bg-orange-200 font-bold text-black rounded-[17px] px-1.5 py-0.5 text-sm border border-[#f0928d] ml-2 mt-0">
          <span className="text-sm">-20%</span>
        </div>
      </span>
    </div>
  </>
);

export default ProductPrice;
