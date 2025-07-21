import { toast } from "sonner";
import { useEffect } from "react";
import { type AlertState } from '@/hooks/useAlert';

interface GenericAlertsProps {
  alert: AlertState;
}

const toastOptions = {
  position: "bottom-center" as const,
  duration: 3500,
  className: "rounded-lg shadow-lg border border-gray-200 bg-white text-gray-900 px-6 py-4 text-base font-medium",
  style: {
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    border: "1px solid #c0c1c2ff",
    background: "#fff",
    color: "#1f2937",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "1rem 1.5rem",
    borderRadius: "0.75rem",
    maxWidth: "400px"
  },
  classNames: {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    closeButton: "hover:bg-gray-100 rounded-full"
  }
};

const Alerts = ({ alert }: GenericAlertsProps) => {
  useEffect(() => {
    if (!alert.show) return;
    if (alert.type === "error") {
      toast.error(alert.message, toastOptions);
    } else if (alert.type === "success") {
      toast.success(alert.message, toastOptions);
    } else if (alert.type === "info") {
      toast.info(alert.message, toastOptions);
    } else if (alert.type === "warning") {
      toast.warning(alert.message, toastOptions);
    } else {
      toast(alert.message, toastOptions);
    }
  }, [alert.show, alert.type, alert.message]);

  return null;
};

export default Alerts;
