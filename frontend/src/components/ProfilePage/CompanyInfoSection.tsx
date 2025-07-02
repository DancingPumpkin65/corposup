import { useState, useEffect } from 'react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../Shadcn/Alert';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import { Textarea } from '../Shadcn/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Shadcn/Select';
import apiClient from '../../services/apiClient';

interface CompanyInfo {
  company_name: string;
  company_phone: string;
  sector: string;
  description: string;
  website: string;
  address1: string;
  address2: string;
  ice_number: string;
  legal_form: string;
  city: string;
  country: string;
}

const CompanyInfoSection = () => {
  const [formData, setFormData] = useState<CompanyInfo>({
    company_name: '',
    company_phone: '',
    sector: '',
    description: '',
    website: '',
    address1: '',
    address2: '',
    ice_number: '',
    legal_form: '',
    city: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });
  const [showWarning, setShowWarning] = useState(true);

  const sectors = [
    'Technologie', 'Commerce', 'Services', 'Industrie', 'Agriculture',
    'Construction', 'Transport', 'Santé', 'Éducation', 'Informatique', 'Autres'
  ];

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    // Check if all required fields are filled to hide warning
    const isComplete = formData.company_name && formData.company_phone && formData.sector;
    setShowWarning(!isComplete);
  }, [formData]);

  const fetchCompanyInfo = async () => {
    try {
      const response = await apiClient.get('/my-company');
      if (response.data && response.data.company) {
        const company = response.data.company;
        setFormData({
          company_name: company.company_name || '',
          company_phone: company.company_phone || '',
          sector: company.sector || '',
          description: company.description || '',
          website: company.website || '',
          address1: company.address1 || '',
          address2: company.address2 || '',
          ice_number: company.ice_number || '',
          legal_form: company.legal_form || '',
          city: company.city || '',
          country: company.country || ''
        });
      }
    } catch (error) {
      console.log('No company info found yet', error);
    }
  };

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/complete-company-info', formData);
      setAlert({
        show: true,
        type: 'success',
        message: 'Informations de l\'entreprise mises à jour avec succès!'
      });
      
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6" id="company-info">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations de l'entreprise</h2>
        <p className="text-gray-600">Complétez les informations concernant votre entreprise</p>
      </div>

      {/* Warning Alert */}
      {showWarning && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertCircleIcon className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Important !</AlertTitle>
          <AlertDescription className="text-yellow-700">
            N'oubliez pas de compléter les informations concernant votre entreprise. 
            Ces données sont essentielles pour la présentation de votre boutique.
          </AlertDescription>
        </Alert>
      )}

      {/* Success/Error Alert */}
      {alert.show && (
        <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          {alert.type === 'error' ? 
            <AlertCircleIcon className="h-4 w-4 text-red-600" /> : 
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
          }
          <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <Label htmlFor="company_name">Nom de l'entreprise *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              placeholder="Entrez le nom de votre entreprise"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="company_phone">Téléphone *</Label>
            <Input
              id="company_phone"
              value={formData.company_phone}
              onChange={(e) => handleChange('company_phone', e.target.value)}
              placeholder="+212 6XX XXX XXX"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sector */}
          <div>
            <Label htmlFor="sector">Secteur d'activité *</Label>
            <Select value={formData.sector} onValueChange={(value) => handleChange('sector', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre secteur" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://votre-site.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ICE Number */}
          <div>
            <Label htmlFor="ice_number">Numéro ICE</Label>
            <Input
              id="ice_number"
              value={formData.ice_number}
              onChange={(e) => handleChange('ice_number', e.target.value)}
              placeholder="1234567890001"
            />
          </div>

          {/* Legal Form */}
          <div>
            <Label htmlFor="legal_form">Forme juridique</Label>
            <Select value={formData.legal_form} onValueChange={(value) => handleChange('legal_form', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la forme juridique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SARL">SARL</SelectItem>
                <SelectItem value="SA">SA</SelectItem>
                <SelectItem value="SNC">SNC</SelectItem>
                <SelectItem value="Auto-entrepreneur">Auto-entrepreneur</SelectItem>
                <SelectItem value="Autres">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Address 1 */}
        <div>
          <Label htmlFor="address1">Adresse 1 *</Label>
          <Input
            id="address1"
            value={formData.address1}
            onChange={(e) => handleChange('address1', e.target.value)}
            placeholder="Adresse complète de votre entreprise"
            required
          />
        </div>

        {/* Address 2 */}
        <div>
          <Label htmlFor="address2">Adresse 2</Label>
          <Input
            id="address2"
            value={formData.address2}
            onChange={(e) => handleChange('address2', e.target.value)}
            placeholder="Adresse secondaire (optionnel)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <Label htmlFor="city">Ville *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Casablanca"
              required
            />
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">Pays *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="Maroc"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description de l'entreprise</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Décrivez votre entreprise, vos produits et services..."
            rows={4}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10">
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
};

export default CompanyInfoSection;
