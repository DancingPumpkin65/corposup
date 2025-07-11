import { useState } from "react";
import {type Discount} from "./types";

function useDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddDiscount = (discount: Discount) => {
    setDiscounts((prev) => [...prev, discount]);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  // ...could add edit logic here...

  return {
    discounts,
    setDiscounts,
    showForm,
    setShowForm,
    loading,
    setLoading,
    handleAddDiscount,
    handleDelete,
  };
}

export default useDiscounts;