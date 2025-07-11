import { Button } from "@/components/Shadcn/Button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shadcn/Table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/Shadcn/DropdownMenu";
import {type Discount} from "./types";

// --- mock data ---
const mockStores = [
  { value: "store1", label: "Boutique 1" },
  { value: "store2", label: "Boutique 2" },
];
const mockProducts = [
  { value: "product1", label: "Produit 1" },
  { value: "product2", label: "Produit 2" },
];

function DiscountsTable ({
  discounts,
  onDelete,
}: {
  discounts: Discount[];
  onDelete: (id: number) => void;
}) {
  // Helper to get label for store or product by value
  const getStoreLabel = (value?: string) =>
    mockStores.find((s) => s.value === value)?.label || "—";
  const getProductLabel = (value?: string) =>
    mockProducts.find((p) => p.value === value)?.label || "—";

  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="min-w-[120px] font-semibold">Appliquer à</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Boutiques / Produits</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Date de début</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Date de fin</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Valeur de la remise</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Ancien prix</TableHead>
            <TableHead className="min-w-[120px] font-semibold">Nouveau prix</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-400 py-4">
                Aucune remise trouvée.
              </TableCell>
            </TableRow>
          ) : (
            discounts.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  {d.applyTo === "store" ? "Boutique" : "Produit"}
                </TableCell>
                <TableCell>
                  {d.applyTo === "store"
                    ? getStoreLabel(d.storeValue)
                    : getProductLabel(d.productValue)}
                </TableCell>
                <TableCell>{d.discount_start.toLocaleDateString()}</TableCell>
                <TableCell>{d.discount_end.toLocaleDateString()}</TableCell>
                <TableCell>
                  {d.discount_value}
                  {d.discount_amount === d.discount_value ? "%" : ""}
                </TableCell>
                <TableCell>{d.old_price}</TableCell>
                <TableCell>{d.new_price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => { /* handle edit */ }}>
                        <Edit className="w-4 h-4 mr-2" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(d.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DiscountsTable;