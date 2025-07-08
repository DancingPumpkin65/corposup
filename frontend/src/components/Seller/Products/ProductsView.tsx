import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/Shadcn/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Shadcn/DropdownMenu/dropdown-menu";
import type { Products } from "@/components/Seller/Products/types";
import ProductCard from "@/components/Seller/Products/ProductCard";

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
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  className='cursor-pointer hover:bg-gray-100' 
                  onClick={() => onEdit(product)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(product)}
                  className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;