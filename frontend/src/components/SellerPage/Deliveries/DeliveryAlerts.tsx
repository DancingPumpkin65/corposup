import Alerts from '@/components/common/Alerts';
import { type DeliveryAlertsProps } from '@/components/SellerPage/Deliveries/types';

const DeliveryAlerts = ({ alert }: DeliveryAlertsProps) => {
  return <Alerts alert={alert} />;
};

export default DeliveryAlerts;
