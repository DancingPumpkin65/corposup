import Alerts from '@/components/common/Alerts';

function DiscountsAlerts() {
  const alert = { show: true, type: "success", message: 'Discount alert!' } as const;

  return <Alerts alert={alert} />;
}

export default DiscountsAlerts;