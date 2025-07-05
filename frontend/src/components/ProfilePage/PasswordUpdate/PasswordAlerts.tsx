import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/Shadcn/Alert';
import { type PasswordAlertsProps } from '@/components/ProfilePage/PasswordUpdate/types';

const PasswordAlerts = ({ alert }: PasswordAlertsProps) => {
  if (!alert.show) return null;

  return (
    <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      {alert.type === 'error' ? 
        <AlertCircleIcon className="h-4 w-4 text-red-600" /> : 
        <CheckCircle2Icon className="h-4 w-4 text-green-600" />
      }
      <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
        {alert.message}
      </AlertDescription>
    </Alert>
  );
};

export default PasswordAlerts;
