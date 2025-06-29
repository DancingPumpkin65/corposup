import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import authService from '../services/authService';
import { Alert, AlertDescription, AlertTitle } from '../components/Shadcn/Alert';
import { Checkbox } from '../components/Shadcn/Checkbox';
import { Label } from '../components/Shadcn/Label';
import { RadioGroup, RadioGroupItem } from '../components/Shadcn/RadioGroup';
import img from '../assets/SignIn.png';
import logoWhite from '../assets/LogoWhite.svg';
import logoColored from '../assets/LogoColored.svg';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer' as 'buyer' | 'seller'
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    setAlert({ show: true, type, title, message });
    
    // Auto-hide success alerts after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            setAlert(prev => ({ ...prev, show: false }));
        }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Hide alert when user starts typing
    if (alert.show) {
        setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as 'buyer' | 'seller'
    });
    // Hide alert when user changes selection
    if (alert.show) {
        setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setAlert(prev => ({ ...prev, show: false }));

    // Client-side validation
    if (!termsAccepted) {
        showAlert('error', 'Erreur de validation', 'Vous devez accepter les termes et conditions.');
        setLoading(false);
        return;
    }

    if (formData.password !== formData.password_confirmation) {
      showAlert('error', 'Erreur de validation', 'Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      showAlert('error', 'Mot de passe trop court', 'Le mot de passe doit contenir au moins 8 caractères.');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      
      showAlert(
        'success',
        'Compte créé avec succès!',
        `Bienvenue ${response.user.firstname} ${response.user.lastname}! Vous pouvez maintenant vous connecter.`
      );

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to dashboard after successful registration
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (error: unknown) {
      console.error('Registration error:', error); // Debug log
      
      let errorMessage = 'Une erreur inattendue s\'est produite.';
      const errorDetails: string[] = [];
      
      // Type guard to check if error has response property
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { errors?: Record<string, string[]> } } };
        
        if (axiosError.response?.status === 422) {
          // Validation errors from backend
          const errors = axiosError.response.data?.errors || {};
          if (errors.email) {
            errorDetails.push('Cette adresse email est déjà utilisée.');
          }
          if (errors.password) {
            errorDetails.push('Le mot de passe ne respecte pas les critères requis.');
          }
          if (errors.firstname || errors.lastname) {
            errorDetails.push('Veuillez vérifier vos nom et prénom.');
          }
          
          errorMessage = errorDetails.length > 0 
            ? errorDetails.join(' ') 
            : 'Veuillez vérifier vos informations.';
        } else if (axiosError.response?.status && axiosError.response.status >= 500) {
          errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
        } else if (!axiosError.response) {
          errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
        }
      }
      
      showAlert('error', 'Erreur lors de l\'inscription', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:rounded-lg flex h-screen overflow-x-hidden">
        {/* Image */}
        <div className="w-2/5 h-screen hidden lg:block relative">
            {/* Logo White - Top Left on Large Screens */}
            <div className="absolute top-12 left-6 z-10">
                <img 
                    src={logoWhite} 
                    alt="Logo" 
                    className="h-8 w-auto"
                />
            </div>
            
            {/* Promotional Text - Bottom Left on Large Screens */}
            <div className="absolute bottom-12 left-6 z-10 text-white">
                <h2 className="text-3xl tracking-wider leading-tight space-y-10">
                    Multipurpose<br />
                    tool to succeed<br />
                    your business
                </h2>
            </div>
            
            <img 
                src={img} 
                alt="Login Image" 
                className="object-cover w-full h-full"
            />
        </div>

        {/* Form */}
        <div className="w-full flex flex-col justify-between mx-4 sm:mx-10 overflow-x-hidden">
            {/* Header Section - Different layout for large vs small screens */}
            <div className="p-2 sm:p-4">
                {/* Large screens: Only sign-in link on the right */}
                <div className="hidden lg:flex justify-end">
                    <Link 
                        className="text-sm md:text-xl text-gray-600 hover:text-gray-900 pt-10 pb-0" 
                        to="/signin"
                    >
                        Déjà inscrit ? <span className="text-blue-500">Se connecter</span>
                    </Link>
                </div>
                
                {/* Small/Medium screens: Logo on left, sign-in link on right */}
                <div className="lg:hidden flex justify-between items-center">
                    <div className="pt-6 sm:pt-10">
                        <img 
                            src={logoColored} 
                            alt="Logo" 
                            className="h-5 sm:h-6 w-auto"
                        />
                    </div>
                    <Link 
                        className="text-xs sm:text-sm md:text-xl text-gray-600 hover:text-gray-900 pt-5 sm:pt-9 pb-0" 
                        to="/signin"
                    >
                        Déjà inscrit? <span className="text-blue-500">Se connecter</span>
                    </Link>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex flex-grow items-center justify-center px-2 sm:px-4 md:px-8">
                <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 mx-auto max-w-sm sm:max-w-none">
                    {/* Title */}
                    <div className="">
                        <h1 className="font-black text-4xl text-gray-900">Créer un compte</h1>
                        <p className="text-gray-400">Créez votre compte pour commencer.</p>
                    </div>

                    {/* Alert */}
                    {alert.show && (
                        <div className="mt-4">
                            <Alert variant={alert.type === 'error' ? 'destructive' : 'success'}>
                                {alert.type === 'error' ? <AlertCircleIcon className="h-4 w-4" /> : <CheckCircle2Icon className="h-4 w-4" />}
                                <AlertTitle>{alert.title}</AlertTitle>
                                <AlertDescription>{alert.message}</AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Prénom and Nom in the same row */}
                    <div className="flex gap-4 mt-4">
                        {/* Prénom (Firstname) */}
                        <div className="flex-1">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="firstname">
                                Prénom
                            </label>
                            <input 
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                id="firstname"
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                autoFocus
                                autoComplete="given-name"
                            />
                        </div>

                        {/* Nom (Lastname) */}
                        <div className="flex-1">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="lastname">
                                Nom
                            </label>
                            <input 
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                id="lastname"
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    {/* E-mail */}
                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="email">
                            E-mail
                        </label>
                        <input 
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    {/* Mot de passe */}
                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password">
                            Mot de passe
                        </label>
                        <input 
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirmer le mot de passe */}
                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password_confirmation">
                            Confirmer le mot de passe
                        </label>
                        <input 
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Rôle */}
                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700 mb-3">
                            Vous êtes ici en tant que
                        </label>
                        <RadioGroup 
                            value={formData.role} 
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
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3 mt-4">
                        <Checkbox 
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            required
                        />
                        <div className="grid gap-1">
                            <Label htmlFor="terms" className="text-sm text-gray-600">
                                Accepter les termes et conditions
                            </Label>
                            <p className="text-xs text-gray-500">
                                En cochant cette case, vous acceptez nos{' '}
                                <Link to="/terms" className="text-blue-500 hover:underline">
                                    termes et conditions
                                </Link>
                                {' '}et notre{' '}
                                <Link to="/privacy" className="text-blue-500 hover:underline">
                                    politique de confidentialité
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading || !termsAccepted}
                        className="inline-flex items-center justify-center px-8 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-4 rounded focus:outline-none focus:shadow-outline mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Création...' : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
