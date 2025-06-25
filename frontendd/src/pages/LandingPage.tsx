import { MainLayout } from '../components/layouts/MainLayout';
import img1 from '../assets/MaskGroup.png';

const LandingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[685px] bg-no-repeat bg-cover bg-center flex items-end justify-start" 
               style={{backgroundImage: `url(${img1})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pb-10">
          <div className="w-full md:w-3/4 lg:w-1/2 text-white">
            <h1 className="text-xl lg:text-4xl lg:w-[900px] font-bold mb-4">
              La MARKETPLACE leader du B2B dédié à l'écosystème industriel et du commerce de gros
            </h1>
            <p className="text-base lg:w-[700px] sm:text-lg md:text-lg opacity-80 mb-4">
              Bienvenue sur CORPOSUP, découvrez un espace unique regroupant une vaste sélection d'équipements et d'articles issus de différents secteurs d'activités.
            </p>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
              En savoir plus
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="flex justify-center items-center w-full min-h-full px-4 py-6">
        <div className="w-full max-w-screen-lg mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <h2 className="text-blue-600 font-montserrat text-lg font-bold">Réactif</h2>
              <p className="text-gray-900 tracking-wide text-sm">Service client disponible 24h/24 et 7j/7</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
            </svg>
            <div>
              <h2 className="text-blue-600 font-montserrat text-lg font-bold">Sécurisé</h2>
              <p className="text-gray-900 tracking-wide text-sm">Marketplace certifiée depuis 2023</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            <div>
              <h2 className="text-blue-600 font-montserrat text-lg font-bold">Transparent</h2>
              <p className="text-gray-900 tracking-wide text-sm">Politique de retour sans tracas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center items-center w-full min-h-full p-5">
        <div className="flex flex-col md:flex-row md:w-[70%] mx-auto md:p-10 gap-6 md:gap-6">
          
          <div className="relative w-full max-w-md md:w-[400px] md:h-[685px] mx-auto">
            <img src="/images/fournisseur.png" alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[15px]"></div>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white w-[90%] md:w-[85%] px-4 md:px-6">
              <h2 className="text-lg md:text-2xl font-bold tracking-wide leading-tight">
                Devenez le fournisseur de milliers d'entreprises
              </h2>
              <a href="#" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg">
                Commencer maintenant
              </a>
            </div>
          </div>

          <div className="flex flex-col md:w-[50%] space-y-4">
            <div className="relative h-auto md:h-[342px] w-full">
              <img src="/images/africanFournissuer.png" alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[15px]"></div>
              
              <div className="absolute bottom-1 left-4 text-white p-5">
                <h2 className="text-lg md:text-2xl font-bold tracking-wide">
                  Trouvez les meilleurs fournisseurs et prix
                </h2>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Commencez à faire des économies !
                </button>
              </div>
            </div>
            
            <div className="relative h-auto md:h-[342px] w-full">
              <img src="/images/teamWork.png" alt="Team work" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[15px]"></div>
              
              <div className="absolute bottom-1 left-4 text-white p-5">
                <h2 className="text-lg md:text-2xl font-bold tracking-wide">
                  Des milliers de produits à des prix imbattables
                </h2>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Voir offres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Section with Worker */}
      <div className="flex flex-col justify-center md:flex-row w-full h-auto bg-blue-600 p-10 items-center">
        <div className="md:w-1/2 ml-8">
          <div className="relative">
            <img src="/images/industryWorker.png" alt="Industry worker" className="rounded-xl shadow-lg"/>
            <div className="absolute -bottom-8 md:-bottom-16 left-10 flex items-center">
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">👥</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">+3200 clients satisfaits</p>
                    <p className="text-gray-500 text-xs">Et ça continue de grandir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 text-white mt-10 md:mt-0 md:ml-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide leading-tight max-w-lg">
            Découvrez des milliers d'offres adaptées aux besoins de votre entreprise
          </h2>

          <ul className="mt-8 space-y-5">
            <li className="flex items-center gap-x-6">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span className="text-lg">Qualité et transactions assurées</span>
            </li>
            <li className="flex items-center gap-x-6">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span className="text-lg max-w-lg">
                Commander en toute transparence, de la recherche de produits/fournisseurs à la gestion des commandes, au paiement et à l'exécution
              </span>
            </li>
            <li className="flex items-center gap-x-6">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span className="text-lg">Bénéficiez de notre expertise à travers notre assistance 24H/24H</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full h-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center bg-blue-600 text-white gap-6">
        <div className="flex justify-center flex-col items-center w-full h-[88px]">
          <p className="text-[50px] font-semibold">+10</p>
          <p className="text-[16px]">Années d'expérience</p>
        </div>
        <div className="flex justify-center flex-col items-center w-full h-[88px]">
          <p className="text-[50px] font-semibold">+2500</p>
          <p className="text-[16px]">produits</p>
        </div>
        <div className="flex justify-center flex-col items-center w-full h-[88px]">
          <p className="text-[50px] font-semibold">+150</p>
          <p className="text-[16px]">fournisseurs</p>
        </div>
        <div className="flex justify-center flex-col items-center w-full h-[88px]">
          <p className="text-[50px] font-semibold">+3200</p>
          <p className="text-[16px]">devis</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 w-full h-auto py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-semibold py-6">Ce que disent nos clients</h2>
            <p className="text-gray-600 max-w-lg text-base md:text-lg">
              Découvrez les témoignages de nos clients satisfaits qui nous font confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col group hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold">AZ</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600">AZIZ</h3>
              <p className="text-gray-500">DG</p>
              <p className="mt-4 text-gray-800 flex-grow">"CORPOSUP nous a permis de saisir des opportunités et d'accélérer notre croissance à l'échelle internationale."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col group hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold">SF</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600">SOUFIANE</h3>
              <p className="text-gray-500">PDG</p>
              <p className="mt-4 text-gray-800 flex-grow">"CorpoSup a transformé notre façon de sourcer nos équipements. La sélection est vaste, et le support client est de qualité supérieure."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col group hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold">GH</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600">GHITA</h3>
              <p className="text-gray-500">Responsable des ventes</p>
              <p className="mt-4 text-gray-800 flex-grow">"En tant que fournisseur, j'ai constaté une augmentation significative des leads et des ventes..."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col group hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold">AM</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600">Amine</h3>
              <p className="text-gray-500">Directeur d'achat</p>
              <p className="mt-4 text-gray-800 flex-grow">"CorpoSup a rationalisé notre processus d'approvisionnement..."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto p-6">
        <div className="p-10 rounded-lg flex items-center justify-center">
          <div className="relative h-[418px] w-full flex justify-center items-center rounded-[15px] bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute bottom-4 left-4 text-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:gap-6 w-full">
              <div className="lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                  Restez connecté
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-gray-300 mt-2">
                  Bénéficiez d'avantages spécifiques, tels que des réductions exclusives en vous abonnant à notre newsletter.
                </p>
              </div>

              <div className="mt-4 lg:mt-0 lg:w-1/3 flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Entrez votre adresse e-mail..." 
                  className="w-full sm:w-[300px] md:w-[350px] lg:w-[389px] border rounded placeholder-opacity-75 p-2 text-gray-600"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 lg:w-2/4 rounded">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;