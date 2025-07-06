import { Link } from 'react-router-dom';
import logoColored from '@/assets/LogoColored.svg';

const SignInHeader = () => {
  return (
    <div className="p-2 sm:p-4">
      {/* Large screens: Only sign-up link on the right */}
      <div className="hidden lg:flex justify-end">
        <Link 
          className="text-sm md:text-xl text-gray-600 hover:text-gray-900 pt-10 pb-0" 
          to="/signup"
        >
          Nouveau ici ? <span className="text-blue-500">S'inscrire</span>
        </Link>
      </div>
      
      {/* Small/Medium screens: Logo on left, sign-up link on right */}
      <div className="lg:hidden flex justify-between items-center">
        <div className="pt-6 sm:pt-10">
          <img 
            src={logoColored} 
            alt="Logo" 
            className="h-5 sm:h-6 w-auto"
          />
        </div>
        <Link 
          className="text-xs sm:text-sm md:text-xl text-gray-600 hover:text-gray-900 pt-5 sm:pt-9 pb-0" 
          to="/signup"
        >
          Nouveau ici? <span className="text-blue-500">S'inscrire</span>
        </Link>
      </div>
    </div>
  );
};

export default SignInHeader;
