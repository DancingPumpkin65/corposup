import { useState } from "react";
import { type Discount } from "./types";
import { toast } from "sonner";

function useDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  const handleAddDiscount = (discount: Discount) => {
    setDiscounts((prev) => [...prev, discount]);
    setShowForm(false);
    toast.success("Remise ajoutée avec succès !");
  };

  const handleDelete = (id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
    toast.success("Remise supprimée avec succès !");
  };

  const handleEditInit = (discount: Discount) => {
    setEditingDiscount(discount);
    setShowForm(true);
  };

  const handleUpdateDiscount = (updated: Discount) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
    setEditingDiscount(null);
    setShowForm(false);
    toast.success("Remise modifiée avec succès !");
  };

  return {
    discounts,
    setDiscounts,
    showForm,
    setShowForm,
    loading,
    setLoading,
    handleAddDiscount,
    handleDelete,
    editingDiscount,
    setEditingDiscount,
    handleEditInit,
    handleUpdateDiscount,
  };
}

export default useDiscounts;