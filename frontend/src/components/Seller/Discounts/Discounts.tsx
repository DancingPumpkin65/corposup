import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar";
import { Button } from "@/components/Shadcn/Button";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shadcn/Table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/Shadcn/DropdownMenu";
import { useState } from "react";
import { Label } from "@/components/Shadcn/Label";
import { Input } from "@/components/Shadcn/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shadcn/Select";
import { Calendar } from "@/components/Shadcn/Calendar/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Shadcn/Popover/popover";
import {  CalendarIcon } from "lucide-react";


// Mock data for stores/products
const mockStores = [
  { value: "store1", label: "Boutique 1" },
  { value: "store2", label: "Boutique 2" },
];
const mockProducts = [
  { value: "product1", label: "Produit 1" },
  { value: "product2", label: "Produit 2" },
];

interface Discount {
  id: number;
  seller_id: number;
  product_id: number;
  store_id: number;
  discount_value: number;
  discount_start: Date;
  discount_end: Date;
  discount_active: boolean;
  discount_amount: number;
  old_price: number;
  new_price: number;
  applyTo: "store" | "product";
  storeValue?: string;
  productValue?: string;
}

const DiscountForm = ({
  onAdd,
  onCancel,
}: {
  onAdd: (d: Discount) => void;
  onCancel: () => void;
}) => {
  const [discountValue, setDiscountValue] = useState<number | "">("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [applyTo, setApplyTo] = useState<"store" | "product">("store");
  const [store, setStore] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [formTouched, setFormTouched] = useState(false);

  const isFormValid =
    discountValue !== "" &&
    !!startDate &&
    !!endDate &&
    discountType &&
    ((applyTo === "store" && !!store) || (applyTo === "product" && !!product));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    if (!isFormValid) return;
    onAdd({
      id: Date.now(),
      seller_id: 1,
      product_id: applyTo === "product" ? 1 : 0,
      store_id: applyTo === "store" ? 1 : 0,
      discount_value: Number(discountValue),
      discount_start: startDate!,
      discount_end: endDate!,
      discount_active: true,
      discount_amount: Number(discountValue),
      old_price: 100,
      new_price: 100 - (discountType === "percentage" ? Number(discountValue) : 0),
      applyTo,
      storeValue: store,
      productValue: product,
    });
    // Reset form
    setDiscountValue("");
    setDiscountType("percentage");
    setStore("");
    setProduct("");
    setApplyTo("store");
    setStartDate(undefined);
    setEndDate(undefined);
    setFormTouched(false);
  };

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6 mt-10 w-full"
      onSubmit={handleSubmit}
    >
      {/* Appliquer à */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Appliquer à *</Label>
        <Select value={applyTo} onValueChange={v => setApplyTo(v as "store" | "product")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="store">Boutique</SelectItem>
            <SelectItem value="product">Produit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Store or Product select */}
      <div className="space-y-2 col-span-1">
        {applyTo === "store" ? (
          <>
            <Label className="block text-base font-medium">Boutiques *</Label>
            <Select value={store} onValueChange={setStore}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vos Boutiques" />
              </SelectTrigger>
              <SelectContent>
                {mockStores.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formTouched && !store && (
              <span className="text-xs text-red-500">Champ requis</span>
            )}
          </>
        ) : (
          <>
            <Label className="block text-base font-medium">Produits *</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vos Produits" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formTouched && !product && (
              <span className="text-xs text-red-500">Champ requis</span>
            )}
          </>
        )}
      </div>
      {/* Date de début */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Date de début *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                "w-full justify-between text-left font-normal " +
                (!startDate ? "text-muted-foreground" : "")
              }
            >
              {startDate ? startDate.toLocaleDateString() : "mm/dd/yyyy"}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {formTouched && !startDate && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Date de fin */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Date de fin *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                "w-full justify-between text-left font-normal " +
                (!endDate ? "text-muted-foreground" : "")
              }
            >
              {endDate ? endDate.toLocaleDateString() : "mm/dd/yyyy"}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {formTouched && !endDate && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Valeur de la remise */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Valeur de la remise *</Label>
        <div className="flex items-center">
          <Input
            type="number"
            className="w-full"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value === "" ? "" : Number(e.target.value))}
            required
            min={0}
          />
          <span className="ml-2 font-bold">%</span>
        </div>
        {formTouched && discountValue === "" && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Type de remise */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Type de remise *</Label>
        <Select value={discountType} onValueChange={v => setDiscountType(v as "percentage" | "fixed")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pourcentage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Pourcentage</SelectItem>
            <SelectItem value="fixed">Fixe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Add a cancel button */}
      <div className="col-span-full flex gap-2 mt-4">
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
          Ajouter la remise
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state if needed

  const handleAddDiscount = (discount: Discount) => {
    setDiscounts((prev) => [...prev, discount]);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  // Helper to get label for store or product by value
  const getStoreLabel = (value?: string) =>
    mockStores.find((s) => s.value === value)?.label || "—";
  const getProductLabel = (value?: string) =>
    mockProducts.find((p) => p.value === value)?.label || "—";

  if (loading) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Remises</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  if (showForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Remises</h1>
          </div>
        </header>
        <div className="py-8 px-4 sm:py-8 sm:px-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-2">
                Créer une remise
              </h2>
              <p>Configurez une remise pour vos clients</p>
            <DiscountForm
              onAdd={handleAddDiscount}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Remises</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mes Remises
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gérez vos remises et leurs informations
              </p>
            </div>
            {!showForm && (
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une remise
              </Button>
            )}
          </div>
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
                            <DropdownMenuItem onClick={() => handleDelete(d.id)}>
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
        </div>
      </div>
    </SidebarInset>
  );
};

export default Discounts;