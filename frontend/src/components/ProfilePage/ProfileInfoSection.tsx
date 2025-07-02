import { useState, useRef } from 'react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription } from '../Shadcn/Alert';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import { RadioGroup, RadioGroupItem } from '../Shadcn/RadioGroup';
import { type User } from '../../hooks/useCurrentUser';
import apiClient from '../../services/apiClient';

interface ProfileInfoSectionProps {
  user: User;
}

interface ProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
  city: string;
  photo_profile?: File | null;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProps) => {
  const [formData, setFormData] = useState<ProfileInfo>({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    role: user.role || 'buyer',
    phone: user.phone || '',
    city: user.city || ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Always use FormData when there's an image, otherwise use JSON
      if (selectedImage) {
        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname);
        formDataToSend.append('lastname', formData.lastname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('role', formData.role);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('photo_profile', selectedImage);

        // Use PUT with _method override for Laravel
        formDataToSend.append('_method', 'PUT');

        const response = await apiClient.post('/update-profile', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setAlert({
          show: true,
          type: 'success',
          message: 'Profil et photo mis à jour avec succès!'
        });

        // Clear the selected image after successful upload
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        // No image selected, use JSON for profile data only
        const dataToSend = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          city: formData.city
        };

        const response = await apiClient.put('/update-profile', dataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setAlert({
          show: true,
          type: 'success',
          message: 'Profil mis à jour avec succès!'
        });

        // Update the user cache with fresh data
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      console.error('Profile update error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour du profil'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Hide any existing alerts
      if (alert.show) {
        setAlert(prev => ({ ...prev, show: false }));
      }
    }
  };

  return (
    <div className="p-6" id="profile-info">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations personnelles</h2>
        <p className="text-gray-600">Mettez à jour les informations de profil de votre compte et votre adresse e-mail.</p>
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
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstname">Prénom</Label>
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={(e) => handleChange('firstname', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastname">Nom</Label>
            <Input
              id="lastname"
              value={formData.lastname}
              onChange={(e) => handleChange('lastname', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        {/* Role */}
        <div>
          <Label className="mb-3 block">Rôle</Label>
          <RadioGroup 
            value={formData.role} 
            onValueChange={(value) => handleChange('role', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buyer" id="buyer" />
              <Label htmlFor="buyer">Acheteur</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seller" id="seller" />
              <Label htmlFor="seller">Vendeur</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Phone and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input
              id="cityPersonal"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          {/* Show current profile image if exists */}
          {user.photo_profile && !selectedImage && (
            <div className="mb-4">
              <img 
                src={`http://127.0.0.1:8000/storage/${user.photo_profile}`} 
                alt="Photo de profil actuelle" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <p className="text-xs text-gray-500 text-center mt-2">Photo actuelle</p>
            </div>
          )}
          
          <p className="text-gray-500 mb-4">Glissez une image ici</p>
          <p className="text-gray-500 mb-4">Ou</p>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Choisir une image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {/* Show selected file name and preview */}
          {selectedImage && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600 mb-2">
                Fichier sélectionné: {selectedImage.name}
              </p>
              <p className="text-xs text-gray-500">
                Taille: {(selectedImage.size / 1024).toFixed(1)} KB
              </p>
              <p className="text-xs text-gray-500">
                Type: {selectedImage.type}
              </p>
            </div>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10">
          {loading ? 'Enregistrement...' : 'ENREGISTRER'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileInfoSection;
