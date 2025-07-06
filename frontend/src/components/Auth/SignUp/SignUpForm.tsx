import AuthInputField from '@/components/Auth/AuthInputField';
import SignUpAlert from '@/components/Auth/SignUp/SignUpAlert';
import FirstLastNameInputs from '@/components/Auth/SignUp/FirstLastNameInputs';
import RoleSelection from '@/components/Auth/SignUp/RoleSelection';
import TermsAcceptance from '@/components/Auth/SignUp/TermsAcceptance';
import { type SignUpFormProps } from '@/components/Auth/types';

const SignUpForm = ({
  formData,
  loading,
  alert,
  termsAccepted,
  setTermsAccepted,
  handleChange,
  handleRoleChange,
  handleSubmit
}: SignUpFormProps) => {
  return (
    <div className="flex flex-grow items-center justify-center px-2 sm:px-4 md:px-8">
      <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 mx-auto max-w-sm sm:max-w-none">
        {/* Title */}
        <div className="">
          <h1 className="font-black text-4xl text-gray-900">Créer un compte</h1>
          <p className="text-gray-400">Créez votre compte pour commencer.</p>
        </div>

        <SignUpAlert alert={alert} />

        <FirstLastNameInputs formData={formData} handleChange={handleChange} />

        <AuthInputField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
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
          autoComplete="new-password"
          className="mt-4"
        />

        <AuthInputField
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label="Confirmer le mot de passe"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          autoComplete="new-password"
          className="mt-4"
        />

        <RoleSelection role={formData.role} handleRoleChange={handleRoleChange} />

        <TermsAcceptance termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} />

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
  );
};

export default SignUpForm;
