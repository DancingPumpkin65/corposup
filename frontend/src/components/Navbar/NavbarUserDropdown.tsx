import { Settings, LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shadcn/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/Shadcn/DropdownMenu';
import { getUserDisplayName, getProfileImageUrl } from '@/utils/user';
import authService from '@/services/authService';
import { UserRoundIcon } from 'lucide-react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  photo_profile?: string;
}

interface NavbarUserDropdownProps {
  user: User;
}

const NavbarUserDropdown = ({ user }: NavbarUserDropdownProps) => {
  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/signin';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
          {user.photo_profile && getProfileImageUrl(user.photo_profile) ? (
            <AvatarImage 
              src={getProfileImageUrl(user.photo_profile)} 
              alt={getUserDisplayName(user)} 
            />
          ) : null}
          <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
            <UserRoundIcon size={16} className="opacity-60" aria-hidden="true" /> 
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getUserDisplayName(user)}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/${user.role}/profile`} className="flex items-center cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserDropdown;
