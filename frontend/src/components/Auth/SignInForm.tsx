import { Link } from 'react-router-dom';
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { Checkbox } from '@/components/Shadcn/Checkbox';
import { Label } from '@/components/Shadcn/Label';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface SignInFormProps {
  formData: { email: string; password: string };
  loading: boolean;
  alert: AlertState;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

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
            autoComplete="email"
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
            name="remember_me"
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
  );
};

export default SignInForm;
