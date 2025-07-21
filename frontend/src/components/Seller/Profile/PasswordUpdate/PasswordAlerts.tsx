import Alerts from '@/components/common/Alerts';
import { type PasswordAlertsProps } from '@/components/Seller/Profile/PasswordUpdate/types';

const PasswordAlerts = ({ alert }: PasswordAlertsProps) => {
  return <Alerts alert={alert} />;
};

export default PasswordAlerts;
