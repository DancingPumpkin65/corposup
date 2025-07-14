import { Button } from "@/components/Shadcn/Button";

const FormButtons = ({ onCancel }: { onCancel: () => void }) => (
  <div className="col-span-full flex gap-2 mt-4">
    <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
      Ajouter la remise
    </Button>
    <Button type="button" variant="outline" onClick={onCancel}>
      Annuler
    </Button>
  </div>
);

export default FormButtons;
