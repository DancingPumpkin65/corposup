import AuthInputField from '@/components/Auth/AuthInputField';
import { type FirstLastNameInputsProps } from '@/components/Auth/types';

const FirstLastNameInputs = ({ formData, handleChange }: FirstLastNameInputsProps) => {
  return (
    <div className="flex gap-4 mt-4">
      <AuthInputField
        id="firstname"
        name="firstname"
        type="text"
        label="Prénom"
        value={formData.firstname}
        onChange={handleChange}
        required
        autoFocus
        autoComplete="given-name"
      />

      <AuthInputField
        id="lastname"
        name="lastname"
        type="text"
        label="Nom"
        value={formData.lastname}
        onChange={handleChange}
        required
        autoComplete="family-name"
      />
    </div>
  );
};

export default FirstLastNameInputs;
