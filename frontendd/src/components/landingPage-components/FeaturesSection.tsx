import icon0 from '../../assets/Headphone.svg';
import icon1 from '../../assets/Security.svg';
import icon2 from '../../assets/Return.svg';

const FeaturesSection = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-full px-4 py-6 overflow-x-hidden">
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex items-center space-x-3 justify-center">
          <img src={icon0} alt="Support Icon" className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1"/>
          <div className="text-left">
            <h2 className="text-blue-600 font-montserrat text-lg font-bold">Réactif</h2>
            <p className="text-gray-900 tracking-wide text-sm">Service client disponible 24h/24 et 7j/7</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 justify-center">
          <img src={icon1} alt="Support Icon" className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1"/>
          <div className="text-left">
            <h2 className="text-blue-600 font-montserrat text-lg font-bold">Sécurisé</h2>
            <p className="text-gray-900 tracking-wide text-sm">Marketplace certifiée depuis 2023</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 justify-center">
          <img src={icon2} alt="Support Icon" className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1"/>
          <div className="text-left">
            <h2 className="text-blue-600 font-montserrat text-lg font-bold">Transparent</h2>
            <p className="text-gray-900 tracking-wide text-sm">Politique de retour sans tracas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;