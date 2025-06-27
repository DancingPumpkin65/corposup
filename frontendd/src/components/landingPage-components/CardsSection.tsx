import backgroundImg0 from '../../assets/Background0.png';
import backgroundImg1 from '../../assets/Background1.png';
import backgroundImg2 from '../../assets/Background2.png';

const CardsSection = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:w-[85%] lg:w-[70%] mx-auto px-4 py-8 pt-0 md:p-6 lg:p-5 gap-4 sm:gap-6 md:gap-8">
        
        <div className="relative w-full md:w-[55%] lg:w-[600px] md:h-[700px]">
          <img src={backgroundImg0} alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
          <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
          
          <div className="absolute bottom-4 left-4 text-white p-3 md:p-5 md:bottom-6 md:left-1/2 md:transform md:-translate-x-1/2 md:w-[85%] md:px-6">
            <h2 className="text-lg md:text-3xl lg:text-4xl font-semibold tracking-wide leading-tight">
              Devenez le fournisseur de milliers d'entreprises
            </h2>
            <button className="text-sm sm:text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2">
                Inscrivez votre entreprise
            </button>
          </div>
        </div>

        <div className="flex flex-col md:w-[45%] space-y-4">
          <div className="relative h-auto md:h-[342px] w-full">
            <img src={backgroundImg1} alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
            <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
            
            <div className="absolute bottom-4 left-4 text-white p-3 md:p-5">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide">
                Trouvez les meilleurs fournisseurs et prix
              </h2>
              <button className="text-sm sm:text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2">
                Commencez à faire des économies !
              </button>
            </div>
          </div>
          
          <div className="relative h-auto md:h-[342px] w-full">
            <img src={backgroundImg2} alt="Team work" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
            <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
            
            <div className="absolute bottom-4 left-4 text-white p-3 md:p-5">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide">
                Des milliers de produits à des prix imbattables
              </h2>
              <button className="text-sm sm:text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2">
                Voir offres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
