import { Button } from '../../Shadcn/Button';
import InputField from './InputField';
import SelectField from './SelectField';
import { type CompanyInfoFormProps } from './types';

const CompanyInfoForm = ({ formData, onFieldChange, onSubmit, loading }: CompanyInfoFormProps) => {
  const sectors = [
    'Technologie', 'Commerce', 'Services', 'Industrie', 'Agriculture',
    'Construction', 'Transport', 'Santé', 'Éducation', 'Informatique', 'Autres'
  ].map(sector => ({ value: sector, label: sector }));

  const legalForms = [
    { value: 'SARL', label: 'SARL' },
    { value: 'SA', label: 'SA' },
    { value: 'SNC', label: 'SNC' },
    { value: 'Auto-entrepreneur', label: 'Auto-entrepreneur' },
    { value: 'Autres', label: 'Autres' }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="company_name"
          label="Nom de l'entreprise"
          value={formData.company_name}
          onChange={(value) => onFieldChange('company_name', value)}
          placeholder="Entrez le nom de votre entreprise"
          required
        />

        <InputField
          id="company_phone"
          label="Téléphone"
          value={formData.company_phone}
          onChange={(value) => onFieldChange('company_phone', value)}
          placeholder="+212 6XX XXX XXX"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          id="sector"
          label="Secteur d'activité"
          value={formData.sector}
          onChange={(value) => onFieldChange('sector', value)}
          placeholder="Sélectionnez votre secteur"
          options={sectors}
          required
        />

        <InputField
          id="website"
          label="Site web"
          value={formData.website}
          onChange={(value) => onFieldChange('website', value)}
          placeholder="https://votre-site.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="ice_number"
          label="Numéro ICE"
          value={formData.ice_number}
          onChange={(value) => onFieldChange('ice_number', value)}
          placeholder="Sélectionnez votre numéro ICE"
        />

        <SelectField
          id="legal_form"
          label="Forme juridique"
          value={formData.legal_form}
          onChange={(value) => onFieldChange('legal_form', value)}
          placeholder="Sélectionnez la forme juridique"
          options={legalForms}
        />
      </div>

      <InputField
        id="address1"
        label="Adresse 1"
        value={formData.address1}
        onChange={(value) => onFieldChange('address1', value)}
        placeholder="Adresse complète de votre entreprise"
        required
      />

      <InputField
        id="address2"
        label="Adresse 2"
        value={formData.address2}
        onChange={(value) => onFieldChange('address2', value)}
        placeholder="Adresse secondaire (optionnel)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="city"
          label="Ville"
          value={formData.city}
          onChange={(value) => onFieldChange('city', value)}
          placeholder="Casablanca"
          required
        />

        <InputField
          id="country"
          label="Pays"
          value={formData.country}
          onChange={(value) => onFieldChange('country', value)}
          placeholder="Maroc"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10"
      >
        {loading ? 'Enregistrement...' : 'ENREGISTRER'}
      </Button>
    </form>
  );
};

export default CompanyInfoForm;
