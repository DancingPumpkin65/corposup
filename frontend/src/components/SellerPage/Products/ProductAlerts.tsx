import Alerts from '@/components/common/Alerts/Alerts';
import type { ProductAlertsProps } from '@/components/SellerPage/Products/types';

const ProductAlerts = ({ alert }: ProductAlertsProps) => {
  const alertState = alert ? { ...alert, show: true } : { show: false, type: 'success' as const, message: '' };
  return <Alerts alert={alertState} />;
};

export default ProductAlerts;
