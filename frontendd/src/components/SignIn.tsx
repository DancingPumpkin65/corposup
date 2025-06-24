import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/SignIn.png';

const SignIn = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await authService.login(formData);
            setMessage(`Welcome ${response.user.firstname} ${response.user.lastname}! Role: ${response.user.role}`);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Redirect to dashboard for role-based routing
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1000);
        } catch {
            setMessage('Erreur de connexion. Vérifiez vos identifiants.');
        }
        
        setLoading(false);
    };

  return (
    <div className="sm:rounded-lg flex h-screen">
        {/* Image */}
        <div className="w-2/5 h-screen hidden lg:block">
            <img 
                src={logo} 
                alt="Login Image" 
                className="object-cover w-full h-full rounded"
            />
        </div>

        {/* Form */}
        <div className="w-full flex flex-col justify-between mx-10">
            {/* Sign Up Link */}
            <div className="flex justify-end p-4">
                <Link 
                    className="text-xl text-gray-600 hover:text-gray-900 pt-10 pr-6 pb-0" 
                    to="/signup"
                >
                    Déjà inscrit ?<span className="text-blue-500">S'inscrire</span>
                </Link>
            </div>

            {/* Login Form */}
            <div className="flex flex-grow items-center justify-center px-4 sm:px-8">
                <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 mx-auto">
                    {/* Title */}
                    <div className="">
                        <h1 className="font-black text-4xl text-gray-900">Bon retour</h1>
                        <p className="text-gray-400">Bon retour ! Veuillez entrer vos informations.</p>
                    </div>

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
                    <div className="block mt-4">
                        <label htmlFor="remember_me" className="inline-flex items-center">
                            <input 
                                id="remember_me" 
                                type="checkbox" 
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                        </label>
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
                        className="inline-flex items-center justify-center px-8 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>

                    {/* Message */}
                    {message && (
                        <div className="mt-4 p-3 rounded bg-gray-100 text-sm">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignIn;