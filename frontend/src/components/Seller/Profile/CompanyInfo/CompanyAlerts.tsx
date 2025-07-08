import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { type CompanyAlertsProps } from '@/components/Seller/Profile/CompanyInfo/types';

const CompanyAlerts = ({ showWarning, alert }: CompanyAlertsProps) => {
  return (
    <>
      {/* Warning Alert */}
      {showWarning && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertCircleIcon className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Important !</AlertTitle>
          <AlertDescription className="text-yellow-700">
            N'oubliez pas de compléter les informations concernant votre entreprise. 
            Ces données sont essentielles pour la présentation de votre boutique.
          </AlertDescription>
        </Alert>
      )}

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
    </>
  );
};

export default CompanyAlerts;
