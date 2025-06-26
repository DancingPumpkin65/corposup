import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import userService from '../../services/userService';
import industryWorkerImg from '../../assets/Decouvrir.png';
import memberNbr from '../../assets/Membres.svg';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
}

const BlueSection = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getFirstThreeUsers();
        console.log('Fetched user data:', userData);
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
    
    if (photo_profile.startsWith('http')) {
      return photo_profile;
    }
    
    if (photo_profile.includes('\\') || photo_profile.includes('C:') || photo_profile.includes('assets')) {
      return photo_profile;
    }
    
    return `http://127.0.0.1:8000/storage/${photo_profile}`;
  };

  return (
    <div className="flex flex-col justify-center md:flex-row w-full h-auto bg-blue-600 px-4 py-10 sm:p-6 md:p-10 items-center">
      <div className="md:w-1/2 flex justify-center items-center px-4">
        <div className="relative inline-block max-w-full">
          <img src={industryWorkerImg} alt="Industry worker" className="rounded-xl shadow-lg w-full h-auto max-w-sm md:max-w-md lg:max-w-lg" />

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
  );
};

export default BlueSection;
