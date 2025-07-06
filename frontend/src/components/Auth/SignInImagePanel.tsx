import img from '@/assets/SignIn.png';
import logoWhite from '@/assets/LogoWhite.svg';

const SignInImagePanel = () => {
  return (
    <div className="w-2/5 h-screen hidden lg:block relative">
      {/* Logo White - Top Left on Large Screens */}
      <div className="absolute top-12 left-6 z-10">
        <img src={logoWhite} alt="Logo" className="h-8 w-auto" />
      </div>
      
      {/* Promotional Text - Bottom Left on Large Screens */}
      <div className="absolute bottom-12 left-6 z-10 text-white">
        <h2 className="text-3xl tracking-wider leading-tight space-y-10">
          Multipurpose<br />
          tool to succeed<br />
          your business
        </h2>
      </div>
      
      <img src={img} alt="Login Image" className="object-cover w-full h-full" />
    </div>
  );
};

export default SignInImagePanel;
