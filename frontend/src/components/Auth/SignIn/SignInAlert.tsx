import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/Shadcn/Alert';
import { type SignInAlertProps } from '@/components/Auth/types';

const SignInAlert = ({ alert }: SignInAlertProps) => {
  if (!alert.show) return null;

  return (
    <div className="mt-4">
      <Alert variant={alert.type === 'error' ? 'destructive' : 'success'}>
        {alert.type === 'error' ? <AlertCircleIcon className="h-4 w-4" /> : <CheckCircle2Icon className="h-4 w-4" />}
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    </div>
  );
};

export default SignInAlert;
