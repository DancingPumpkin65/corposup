import { MainLayout } from '../components/layouts/MainLayout';
import { useState, useEffect } from 'react';
import userService from '../services/userService';
import img1 from '../assets/MaskGroup.png';
import icon0 from '../assets/Headphone.svg';
import icon1 from '../assets/Security.svg';
import icon2 from '../assets/Return.svg';
import backgroundImg0 from '../assets/Background0.png';
import backgroundImg1 from '../assets/Background1.png';
import backgroundImg2 from '../assets/Background2.png';
import industryWorkerImg from '../assets/Decouvrir.png';
import memberNbr from '../assets/Membres.svg';
import itemPrd from '../assets/Item.jpg';
import itemPrd2 from '../assets/Item2.jpg';

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  main_image?: string;
  category?: {
    name: string;
  };
  reviews_avg_rating?: number;
  reviews_count?: number;
}

const LandingPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Static products data
  const products: Product[] = [
    {
      id: 1,
      name: 'Équipement Industriel Premium',
      price: 1250,
      original_price: 1500,
      main_image: itemPrd,
      category: { name: 'Électronique' },
      reviews_avg_rating: 4.5,
      reviews_count: 128
    },
    {
      id: 2,
      name: 'Machine de Production Avancée',
      price: 2800,
      original_price: 3200,
      main_image: itemPrd,
      category: { name: 'Machines' },
      reviews_avg_rating: 4.8,
      reviews_count: 89
    },
    {
      id: 3,
      name: 'Outil Professionnel Haute Qualité',
      price: 450,
      original_price: 550,
      main_image: itemPrd,
      category: { name: 'Outils' },
      reviews_avg_rating: 4.2,
      reviews_count: 203
    },
    {
      id: 4,
      name: 'Matériel de Construction',
      price: 890,
      original_price: 1100,
      main_image: itemPrd,
      category: { name: 'Matériaux' },
      reviews_avg_rating: 4.6,
      reviews_count: 156
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getFirstThreeUsers();
        console.log('Fetched user data:', userData); // Debug log
        setUsers(userData);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getInitials = (firstname: string, lastname: string): string => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  const getProfileImageUrl = (photo_profile?: string): string => {
    if (!photo_profile) return industryWorkerImg;
    
    // If it's already a full HTTP URL, use it as is
    if (photo_profile.startsWith('http')) {
      return photo_profile;
    }
    
    // If the path contains filesystem paths or is corrupted, use fallback
    if (photo_profile.includes('\\') || photo_profile.includes('C:') || photo_profile.includes('assets')) {
      return photo_profile;
    }
    
    // Normal case: relative path from storage
    return `http://127.0.0.1:8000/storage/${photo_profile}`;
  };

  const getProductImageUrl = (imagePath?: string): string => {
    if (!imagePath) {
      return itemPrd;
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For local images imported as modules, return as is
    return imagePath;
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index} 
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[685px] bg-no-repeat bg-cover bg-center flex items-end justify-start" 
               style={{backgroundImage: `url(${img1})`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent rounded-[15px]"></div>
        
        <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pb-10">
          <div className="w-full md:w-3/4 lg:w-1/2 text-white">
            <h1 className="text-xl lg:text-4xl lg:w-[900px] font-bold mb-4">
              La MARKETPLACE leader du B2B dédié à l'écosystème industriel et du commerce de gros
            </h1>
            <p className="text-base lg:w-[700px] sm:text-lg md:text-lg opacity-80 mb-4">
              Bienvenue sur CORPOSUP, découvrez un espace unique regroupant une vaste sélection d'équipements et d'articles issus de différents secteurs d'activités.
            </p>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-lg">
              En savoir plus
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="flex justify-center items-center w-full min-h-full px-4 py-16">
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
              <p className="text-gray-900 tracking-wide text-sm">Marketplace certifiée depuis 2023&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center">
            <img src={icon2} alt="Support Icon" className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1"/>
            <div className="text-left">
              <h2 className="text-blue-600 font-montserrat text-lg font-bold">Transparent</h2>
              <p className="text-gray-900 tracking-wide text-sm">Politique de retour sans tracas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center items-center w-full min-h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:w-[85%] lg:w-[70%] mx-auto p-4 md:p-6 lg:p-5 gap-4 sm:gap-6 md:gap-8">
          
          <div className="relative w-full md:w-[55%] lg:w-[600px] md:h-[700px]">
            <img src={backgroundImg0} alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
            <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white w-[90%] md:w-[85%] px-4 md:px-6">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-semibold tracking-wide leading-tight">
                Devenez le fournisseur de milliers d'entreprises
              </h2>
              <a href="#" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg">
                Inscrivez votre entreprise
              </a>
            </div>
          </div>

          <div className="flex flex-col md:w-[45%] space-y-4">
            <div className="relative h-auto md:h-[342px] w-full">
              <img src={backgroundImg1} alt="Fournisseur image" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
              <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
              
              <div className="absolute bottom-1 left-4 text-white p-3 md:p-5">
                <h2 className="text-lg md:text-1xl lg:text-2xl font-semibold tracking-wide">
                  Trouvez les meilleurs fournisseurs et prix
                </h2>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2">
                  Commencez à faire des économies !
                </button>
              </div>
            </div>
            
            <div className="relative h-auto md:h-[342px] w-full">
              <img src={backgroundImg2} alt="Team work" className="rounded-[15px] w-full h-auto md:h-full object-cover"/>
              <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(to_top,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_20%,_transparent_60%)]"></div>
              
              <div className="absolute bottom-1 left-4 text-white p-3 md:p-5">
                <h2 className="text-lg md:text-1xl lg:text-2xl font-semibold tracking-wide">
                  Des milliers de produits à des prix imbattables
                </h2>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2">
                  Voir offres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Section with Worker */}
      <div className="flex flex-col justify-center md:flex-row w-full h-auto bg-blue-600 p-4 sm:p-6 md:p-10 items-center">
        <div className="md:w-1/2 flex justify-center items-center px-4">
          <div className="relative inline-block max-w-full">
            <img src={industryWorkerImg} alt="Industry worker" className="rounded-xl shadow-lg w-full h-auto max-w-sm md:max-w-md lg:max-w-lg" />

            {/* Avatar section positioned relative to image - responsive sizing */}
            <div className="absolute bottom-0 right-0 transform translate-x-2 sm:translate-x-4 md:translate-x-6 lg:translate-x-8 translate-y-1 sm:translate-y-2">
              <div className="bg-white rounded-lg p-2 sm:p-2 md:p-4 shadow-lg">
                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 h-12 sm:h-14 md:h-16">
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 sm:-space-x-3 *:data-[slot=avatar]:ring-1 sm:*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <Avatar key={user.id} className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
                          <AvatarImage 
                            src={getProfileImageUrl(user.photo_profile)} 
                            alt={`@${user.firstname.toLowerCase()}`}
                          />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {getInitials(user.firstname, user.lastname)}
                          </AvatarFallback>
                        </Avatar>
                      ))
                    ) : (
                      <>
                        <Avatar className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16">
                          <AvatarImage src={industryWorkerImg} alt="@user1" />
                          <AvatarFallback className="text-xs sm:text-sm">U1</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16">
                          <AvatarImage src={industryWorkerImg} alt="@user2" />
                          <AvatarFallback className="text-xs sm:text-sm">U2</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16">
                          <AvatarImage src={industryWorkerImg} alt="@user3" />
                          <AvatarFallback className="text-xs sm:text-sm">U3</AvatarFallback>
                        </Avatar>
                      </>
                    )}
                    <Avatar className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
                      <AvatarImage src={memberNbr} alt="@user1" />
                      <AvatarFallback className="text-xs sm:text-sm">U1</AvatarFallback>
                    </Avatar>
                  </div>
                  <Separator orientation="vertical" className="bg-gray-300 h-8 sm:h-10 md:h-12" />
                  <div className="text-center px-1 sm:px-2 md:px-2">
                    <p className="text-blue-600 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-3xl">99%</p>
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-sm">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 text-white mt-6 sm:mt-8 md:mt-10 lg:mt-0 md:ml-6 lg:ml-12 px-4">
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

      {/* Products Section */}
      <div className="w-full py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-semibold py-6">Nos Produits Populaires</h2>
            <p className="text-gray-600 max-w-lg text-base md:text-lg">
              Découvrez notre sélection de produits les plus demandés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden ">
                    <img 
                      src={getProductImageUrl(product.main_image)} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg p-3"
                      onError={(e) => {
                        e.currentTarget.src = itemPrd;
                      }}
                    />
                    {/* Discount Badge */}
                    {product.original_price && product.original_price > product.price && (
                      <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-xs font-semibold">
                        {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {/* Category */}
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    {product.category?.name || 'Général'}
                  </p>
                  
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Reviews Stars */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {renderStars(product.reviews_avg_rating || 0)}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews_count || 0})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {new Intl.NumberFormat('fr-FR').format(product.price)}€
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {new Intl.NumberFormat('fr-FR').format(product.original_price)}€
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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