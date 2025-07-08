import PasswordAlerts from '@/components/Seller/Profile/PasswordUpdate/PasswordAlerts';
import PasswordUpdateForm from '@/components/Seller/Profile/PasswordUpdate/PasswordUpdateForm';
import { usePasswordUpdate } from '@/components/Seller/Profile/PasswordUpdate/usePasswordUpdate';

const PasswordUpdateSection = () => {
  const {
    formData,
    loading,
    alert,
    handleChange,
    handleSubmit
  } = usePasswordUpdate();

  return (
    <div className="p-6" id="password-update">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mettre à jour le mot de passe</h2>
        <p className="text-gray-600">Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</p>
      </div>

      <PasswordAlerts alert={alert} />

      <PasswordUpdateForm
        formData={formData}
        onFieldChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default PasswordUpdateSection;
