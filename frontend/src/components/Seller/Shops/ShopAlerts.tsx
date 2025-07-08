import Alerts from '@/components/common/Alerts';
import { type AlertState } from '@/hooks/useAlert';

interface ShopAlertsProps {
  alert: AlertState;
}

const ShopAlerts = ({ alert }: ShopAlertsProps) => {
  return <Alerts alert={alert} />;
};

export default ShopAlerts;
