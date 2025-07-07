import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shadcn/Table/table";
import { Button } from "@/components/Shadcn/Button";
import type { Products } from "@/components/SellerPage/Products/types";
import { Badge } from "@/components/Shadcn/Badge/badge";

interface ProductsTableProps {
  products: Products[];
  onEdit: (product: Products) => void;
  onDelete: (product: Products) => void;
}

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.product_name}</TableCell>
            <TableCell>{product.product_price} €</TableCell>
            <TableCell>{product.product_stock}</TableCell>
            <TableCell>
              <Badge variant={product.product_status === 'published' ? 'default' : 'secondary'}>
                {product.product_status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="mr-2">
                Modifier
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(product)}>
                Supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
