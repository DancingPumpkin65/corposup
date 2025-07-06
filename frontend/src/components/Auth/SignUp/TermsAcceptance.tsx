import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/Shadcn/Checkbox';
import { Label } from '@/components/Shadcn/Label';
import { type TermsAcceptanceProps } from '@/components/Auth/types';

const TermsAcceptance = ({ termsAccepted, setTermsAccepted }: TermsAcceptanceProps) => {
  return (
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
  );
};

export default TermsAcceptance;
