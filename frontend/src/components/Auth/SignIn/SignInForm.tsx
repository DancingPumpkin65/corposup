import { Link } from 'react-router-dom';
import AuthInputField from '@/components/Auth/AuthInputField';
import SignInAlert from '@/components/Auth/SignIn/SignInAlert';
import RememberMeCheckbox from '@/components/Auth/SignIn/RememberMeCheckbox';
import { type SignInFormProps } from '@/components/Auth/types';

const SignInForm = ({
  formData,
  loading,
  alert,
  rememberMe,
  setRememberMe,
  handleChange,
  handleSubmit
}: SignInFormProps) => {
  return (
    <div className="flex flex-grow items-center justify-center px-2 sm:px-4 md:px-8">
      <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 mx-auto max-w-sm sm:max-w-none">
        {/* Title */}
        <div className="">
          <h1 className="font-black text-4xl text-gray-900">Bon retour</h1>
          <p className="text-gray-400">Bon retour ! Veuillez entrer vos informations.</p>
        </div>

        <SignInAlert alert={alert} />

        <AuthInputField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
          autoFocus
          autoComplete="email"
          className="mt-4"
        />

        <AuthInputField
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className="mt-4"
        />

        <RememberMeCheckbox rememberMe={rememberMe} setRememberMe={setRememberMe} />

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
  );
};

export default SignInForm;
