import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import logoColored from '../../assets/LogoColored.svg';
import menuIcon from '../../assets/Menu.svg';

const MobileMenu = () => {
  return (
    <div className="sm:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center p-0 bg-transparent border-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
              <img className="w-[18px]" src={menuIcon} alt="Menu" />
              <span className="ml-[10px] text-base text-black font-semibold">Menu</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 w-[300px] lg:grid-cols-[.75fr_1fr] p-4">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-blue-50 to-blue-100 flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      to="/"
                    >
                      <img src={logoColored} alt="Logo" className="h-8 w-auto mb-4" />
                      <p className="text-gray-600 text-sm leading-tight">
                        Marketplace B2B leader
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="text-sm font-medium leading-none">Accueil</div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                        Page d'accueil
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/blog" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="text-sm font-medium leading-none">Blogs</div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                        Articles et actualités
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/abonnements" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="text-sm font-medium leading-none">Abonnements</div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                        Plans et tarifs
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/contact" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="text-sm font-medium leading-none">Contact</div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                        Nous contacter
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MobileMenu;
