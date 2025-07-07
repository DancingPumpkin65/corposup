import { Button } from "@/components/Shadcn/Button";
import type { Products } from "@/components/SellerPage/Products/types";
import ProductCard from "@/components/SellerPage/Products/ProductCard";

interface ProductsViewProps {
  products: Products[];
  onEdit: (product: Products) => void;
  onDelete: (product: Products) => void;
}

const ProductsView = ({ products, onEdit, onDelete }: ProductsViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="relative group">
          <ProductCard product={product} previewImage={product.images.find(img => img.is_main)?.preview} />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
              Modifier
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(product)}>
              Supprimer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;