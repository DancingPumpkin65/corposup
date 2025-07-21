import Alerts from '@/components/common/Alerts';
import { type PersonalInfoAlertsProps } from '@/components/Seller/Profile/PasswordUpdate/types';

const PersonalInfoAlerts = ({ alert }: PersonalInfoAlertsProps) => {
  return <Alerts alert={alert} />;
};

export default PersonalInfoAlerts;
