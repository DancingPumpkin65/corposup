import img1 from '@/assets/MaskGroup.png';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[685px] bg-no-repeat bg-cover bg-center flex items-end justify-start" 
             style={{backgroundImage: `url(${img1})`, }}>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent rounded-[15px]"></div>
      
      <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <div className="w-full md:w-3/4 lg:w-1/2 text-white">
          <h1 className="text-4xl lg:text-4xl lg:w-[900px] font-bold mb-4">
            La MARKETPLACE leader du B2B dédié à l'écosystème industriel et du commerce de gros
          </h1>
          <p className="text-xl lg:w-[700px] sm:text-lg md:text-lg opacity-80 mb-6">
            Bienvenue sur CORPOSUP, découvrez un espace unique regroupant une vaste sélection d'équipements et d'articles issus de différents secteurs d'activités.
          </p>
          <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-lg">
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
