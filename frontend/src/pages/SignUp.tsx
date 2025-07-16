import SignInImagePanel from '@/components/Auth/ImagePanel';
import SignUpHeader from '@/components/Auth/SignUp/SignUpHeader';
import SignUpForm from '@/components/Auth/SignUp/SignUpForm';
import { useSignUp } from '@/hooks/useSignUp';

const SignUp = () => {
  const {
    formData,
    loading,
    alert,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleRoleChange,
    handleSubmit
  } = useSignUp();

  return (
    <div className="sm:rounded-none flex h-screen overflow-x-hidden">
      {/* Image Panel */}
      <SignInImagePanel />

      {/* Form Panel */}
      <div className="w-full flex flex-col justify-between mx-4 sm:mx-10 overflow-x-hidden">
        {/* Header */}
        <SignUpHeader />

        {/* Sign Up Form */}
        <SignUpForm
          formData={formData}
          loading={loading}
          alert={alert}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          handleChange={handleChange}
          handleRoleChange={handleRoleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignUp;
