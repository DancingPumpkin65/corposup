import Alerts from '@/components/common/Alerts';
import { type DiscountsAlertsProps } from './types';

const DiscountsAlerts = ({ alert }: DiscountsAlertsProps) => {
  const alertState = alert ? { ...alert, show: true } : { show: false, type: 'success' as const, message: '' };
  return <Alerts alert={alertState} />;
};

export default DiscountsAlerts;
