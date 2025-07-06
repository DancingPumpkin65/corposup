import { Label } from '@/components/Shadcn/Label';
import { RadioGroup, RadioGroupItem } from '@/components/Shadcn/RadioGroup';
import { type RoleSelectionProps } from '@/components/Auth/types';

const RoleSelection = ({ role, handleRoleChange }: RoleSelectionProps) => {
  return (
    <fieldset className="mt-4">
      <legend className="block font-medium text-sm text-gray-700 mb-3">
        Vous êtes ici en tant que
      </legend>
      <RadioGroup 
        name="role"
        value={role} 
        onValueChange={handleRoleChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buyer" id="buyer" />
          <Label htmlFor="buyer" className="text-sm text-gray-600 cursor-pointer">
            Acheteur
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="seller" id="seller" />
          <Label htmlFor="seller" className="text-sm text-gray-600 cursor-pointer">
            Vendeur
          </Label>
        </div>
      </RadioGroup>
    </fieldset>
  );
};

export default RoleSelection;
