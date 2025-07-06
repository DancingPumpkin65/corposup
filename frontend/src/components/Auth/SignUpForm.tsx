import { Link } from 'react-router-dom';
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { Checkbox } from '@/components/Shadcn/Checkbox';
import { Label } from '@/components/Shadcn/Label';
import { RadioGroup, RadioGroupItem } from '@/components/Shadcn/RadioGroup';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface SignUpFormProps {
  formData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'buyer' | 'seller';
  };
  loading: boolean;
  alert: AlertState;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

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
        <fieldset className="mt-4">
          <legend className="block font-medium text-sm text-gray-700 mb-3">
            Vous êtes ici en tant que
          </legend>
          <RadioGroup 
            name="role"
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
        </fieldset>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 mt-4">
          <Checkbox 
            id="terms"
            name="terms"
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
  );
};

export default SignUpForm;
