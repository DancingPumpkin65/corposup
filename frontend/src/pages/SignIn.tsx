import SignInImagePanel from '@/components/Auth/ImagePanel';
import SignInHeader from '@/components/Auth/SignIn/SignInHeader';
import SignInForm from '@/components/Auth/SignIn/SignInForm';
import { useSignIn } from '@/hooks/useSignIn';

const SignIn = () => {
  const {
    formData,
    loading,
    alert,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit
  } = useSignIn();

  return (
    <div className="sm:rounded-none flex h-screen overflow-x-hidden">
      {/* Image Panel */}
      <SignInImagePanel />

      {/* Form Panel */}
      <div className="w-full flex flex-col justify-between mx-4 sm:mx-10 overflow-x-hidden">
        {/* Header */}
        <SignInHeader />

        {/* Login Form */}
        <SignInForm
          formData={formData}
          loading={loading}
          alert={alert}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignIn;
