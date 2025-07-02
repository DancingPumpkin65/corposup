import { useState } from 'react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription } from '../Shadcn/Alert';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import apiClient from '../../services/apiClient';

interface PasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const PasswordUpdateSection = () => {
  const [formData, setFormData] = useState<PasswordData>({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const handleChange = (field: keyof PasswordData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Les mots de passe ne correspondent pas'
      });
      return;
    }

    if (formData.password.length < 8) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Le mot de passe doit contenir au moins 8 caractères'
      });
      return;
    }

    setLoading(true);

    try {
      // Use the updateProfile endpoint with correct field names
      await apiClient.put('/update-profile', {
        old_password: formData.current_password,
        new_password: formData.password,
        new_password_confirmation: formData.password_confirmation
      });
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Mot de passe mis à jour avec succès!'
      });

      // Reset form
      setFormData({
        current_password: '',
        password: '',
        password_confirmation: ''
      });

      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (error) {
      console.error('Password update error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour du mot de passe. Vérifiez votre mot de passe actuel.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6" id="password-update">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mettre à jour le mot de passe</h2>
        <p className="text-gray-600">Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</p>
      </div>

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
        {/* Current Password */}
        <div>
          <Label htmlFor="current_password">Mot de passe actuel</Label>
          <Input
            id="current_password"
            type="password"
            value={formData.current_password}
            onChange={(e) => handleChange('current_password', e.target.value)}
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
            onChange={(e) => handleChange('password', e.target.value)}
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
            onChange={(e) => handleChange('password_confirmation', e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10">
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
};

export default PasswordUpdateSection;
