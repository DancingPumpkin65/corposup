import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../assets/SignIn.png';
import logoWhite from '../assets/LogoWhite.svg';
import logoColored from '../assets/LogoColored.svg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.password !== formData.password_confirmation) {
      setMessage('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
    setMessage(`Compte créé avec succès! Bienvenue ${response.data.user.firstname} ${response.data.user.lastname}`);
    
    if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    setLoading(false);
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
                        <label className="block font-medium text-sm text-gray-700">
                            Vous êtes ici en tant que
                        </label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <input 
                                    id="buyer" 
                                    type="radio" 
                                    name="role" 
                                    value="buyer" 
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" 
                                    checked={formData.role === 'buyer'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="buyer" className="text-sm text-gray-600">Acheteur</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    id="seller" 
                                    type="radio" 
                                    name="role" 
                                    value="seller" 
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" 
                                    checked={formData.role === 'seller'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="seller" className="text-sm text-gray-600">Vendeur</label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center px-8 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                        {loading ? 'Création...' : "S'inscrire"}
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

export default SignUp;
