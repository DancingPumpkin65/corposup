import { Button } from '../../Shadcn/Button';
import { Input } from '../../Shadcn/Input';
import { Label } from '../../Shadcn/Label';
import { type PasswordUpdateFormProps } from './types';

const PasswordUpdateForm = ({ formData, onFieldChange, onSubmit, loading }: PasswordUpdateFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Current Password */}
      <div>
        <Label htmlFor="current_password">Mot de passe actuel</Label>
        <Input
          id="current_password"
          type="password"
          value={formData.current_password}
          onChange={(e) => onFieldChange('current_password', e.target.value)}
          required
        />
      </div>

      {/* New Password */}
      <div>
        <Label htmlFor="password">Nouveau mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => onFieldChange('password', e.target.value)}
          required
        />
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={formData.password_confirmation}
          onChange={(e) => onFieldChange('password_confirmation', e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10">
        {loading ? 'Enregistrement...' : 'ENREGISTRER'}
      </Button>
    </form>
  );
};

export default PasswordUpdateForm;
