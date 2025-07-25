import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setDiscounts,
  setShowForm,
  setLoading,
  setEditingDiscount,
} from "@/store/discountsSlice";
import { type Discount } from "./types";

function useDiscounts() {
  const dispatch = useDispatch<AppDispatch>();
  const discounts = useSelector(
    (state: RootState) => state.discounts.discounts
  );
  const showForm = useSelector(
    (state: RootState) => state.discounts.showForm
  );
  const loading = useSelector(
    (state: RootState) => state.discounts.loading
  );
  const editingDiscount = useSelector(
    (state: RootState) => state.discounts.editingDiscount
  );

  const handleAddDiscount = (discount: Discount) => {
    dispatch(setDiscounts([...discounts, discount]));
    dispatch(setShowForm(false));
    toast.success("Remise ajoutée avec succès !");
  };

  const handleDelete = (id: number) => {
    dispatch(setDiscounts(discounts.filter((d) => d.id !== id)));
    toast.success("Remise supprimée avec succès !");
  };

  const handleEditInit = (discount: Discount) => {
    dispatch(setEditingDiscount(discount));
    dispatch(setShowForm(true));
  };

  const handleUpdateDiscount = (updated: Discount) => {
    dispatch(
      setDiscounts(
        discounts.map((d) => (d.id === updated.id ? updated : d))
      )
    );
    dispatch(setEditingDiscount(null));
    dispatch(setShowForm(false));
    toast.success("Remise modifiée avec succès !");
  };

  return {
    discounts,
    setDiscounts: (v: Discount[]) => dispatch(setDiscounts(v)),
    showForm,
    setShowForm: (v: boolean) => dispatch(setShowForm(v)),
    loading,
    setLoading: (v: boolean) => dispatch(setLoading(v)),
    handleAddDiscount,
    handleDelete,
    editingDiscount,
    setEditingDiscount: (v: Discount | null) =>
      dispatch(setEditingDiscount(v)),
    handleEditInit,
    handleUpdateDiscount,
  };
}

export default useDiscounts;