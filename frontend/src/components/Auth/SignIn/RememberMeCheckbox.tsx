import { Checkbox } from '@/components/Shadcn/Checkbox';
import { Label } from '@/components/Shadcn/Label';
import { type RememberMeCheckboxProps } from '@/components/Auth/types';

const RememberMeCheckbox = ({ rememberMe, setRememberMe }: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <Checkbox 
        id="remember_me"
        name="remember_me"
        checked={rememberMe}
        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
      />
      <Label htmlFor="remember_me" className="text-sm text-gray-600 cursor-pointer">
        Se souvenir de moi
      </Label>
    </div>
  );
};

export default RememberMeCheckbox;
