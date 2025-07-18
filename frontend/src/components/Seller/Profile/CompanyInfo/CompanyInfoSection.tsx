import CompanyAlerts from '@/components/Seller/Profile/CompanyInfo/CompanyAlerts';
import CompanyInfoForm from '@/components/Seller/Profile/CompanyInfo/CompanyInfoForm';

interface CompanyInfoSectionProps {
  formData: any;
  loading: boolean;
  alert: any;
  showWarning: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CompanyInfoSection = ({
  formData,
  loading,
  alert,
  showWarning,
  handleChange,
  handleSubmit,
}: CompanyInfoSectionProps) => {
  return (
    <div className="p-6" id="company-info">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations de l'entreprise</h2>
        <p className="text-gray-600">Complétez les informations concernant votre entreprise</p>
      </div>

      <CompanyAlerts showWarning={showWarning} alert={alert} />

      <CompanyInfoForm
        formData={formData}
        onFieldChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default CompanyInfoSection;
