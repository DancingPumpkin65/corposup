import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import authService from '@/services/authService';
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { Checkbox } from '@/components/Shadcn/Checkbox';
import { Label } from '@/components/Shadcn/Label';
import img from '@/assets/SignIn.png';
import logoWhite from '@/assets/LogoWhite.svg';
import logoColored from '@/assets/LogoColored.svg';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const SignIn = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertState>({
        show: false,
        type: 'success',
        title: '',
        message: ''
    });
    const [rememberMe, setRememberMe] = useState(false);

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
        setFormData({...formData, [e.target.name]: e.target.value});
        // Hide alert when user starts typing
        if (alert.show) {
            setAlert(prev => ({ ...prev, show: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setLoading(true);
        setAlert(prev => ({ ...prev, show: false }));

        try {
            const response = await authService.login(formData);
            
            showAlert(
                'success',
                'Connexion réussie!',
                `Bienvenue ${response.user.firstname} ${response.user.lastname}!`
            );

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Redirect to dashboard for role-based routing
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } catch (error: unknown) {
            console.error('Login error:', error); // Debug log
            
            let errorMessage = 'Une erreur inattendue s\'est produite.';
            
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status: number } };
                if (axiosError.response?.status === 401) {
                    errorMessage = 'Email ou mot de passe incorrect.';
                } else if (axiosError.response?.status === 422) {
                    errorMessage = 'Veuillez vérifier vos informations de connexion.';
                } else if (axiosError.response?.status && axiosError.response.status >= 500) {
                    errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
                } else if (!axiosError.response) {
                    errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
                }
            }
            
            showAlert('error', 'Erreur de connexion', errorMessage);
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
                <img src={logoWhite} alt="Logo" className="h-8 w-auto" />
            </div>
            
            {/* Promotional Text - Bottom Left on Large Screens */}
            <div className="absolute bottom-12 left-6 z-10 text-white">
                <h2 className="text-3xl tracking-wider leading-tight space-y-10">
                    Multipurpose<br />
                    tool to succeed<br />
                    your business
                </h2>
            </div>
            
            <img src={img} alt="Login Image" className="object-cover w-full h-full" />
        </div>

        {/* Form */}
        <div className="w-full flex flex-col justify-between mx-4 sm:mx-10 overflow-x-hidden">
            {/* Header Section - Different layout for large vs small screens */}
            <div className="p-2 sm:p-4">
                {/* Large screens: Only sign-up link on the right */}
                <div className="hidden lg:flex justify-end">
                    <Link 
                        className="text-sm md:text-xl text-gray-600 hover:text-gray-900 pt-10 pb-0" 
                        to="/signup"
                    >
                        Nouveau ici ? <span className="text-blue-500">S'inscrire</span>
                    </Link>
                </div>
                
                {/* Small/Medium screens: Logo on left, sign-up link on right */}
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
                        to="/signup"
                    >
                        Nouveau ici? <span className="text-blue-500">S'inscrire</span>
                    </Link>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex flex-grow items-center justify-center px-2 sm:px-4 md:px-8">
                <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 mx-auto max-w-sm sm:max-w-none">
                    {/* Title */}
                    <div className="">
                        <h1 className="font-black text-4xl text-gray-900">Bon retour</h1>
                        <p className="text-gray-400">Bon retour ! Veuillez entrer vos informations.</p>
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

                    {/* Email Address */}
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
                            autoFocus 
                            autoComplete="username"
                        />
                    </div>

                    {/* Password */}
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
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-3 mt-4">
                        <Checkbox 
                            id="remember_me"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember_me" className="text-sm text-gray-600 cursor-pointer">
                            Se souvenir de moi
                        </Label>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-between mt-4">
                        <Link className="underline text-sm text-gray-600 hover:text-gray-900" to="/forgot-password">
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center px-8 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-4 rounded focus:outline-none focus:shadow-outline mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignIn;
