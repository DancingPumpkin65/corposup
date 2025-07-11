import { Link } from 'react-router-dom';
import { HomeIcon, BoxIcon, SearchIcon, UserIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroupLabel
} from '@/components/Shadcn/Sidebar/sidebar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/Shadcn/DropdownMenu';
import logoWhite from '@/assets/LogoWhite.svg';
import {
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
  DropdownMenuSeparator
} from '@/components/Shadcn/DropdownMenu/dropdown-menu';
import { Button } from '@/components/Shadcn/Button/button';
import { AvatarImage } from '@/components/Shadcn/Avatar/avatar';
import { getUserDisplayName, getProfileImageUrl } from '@/utils/user';
import authService from '@/services/authService';

const ChevronRightSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"></path></svg>
);

const adminSidebarItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Utilisateurs",
    url: "/admin/users",
    icon: UserIcon
  },
  {
    title: "Produits",
    url: "/admin/products",
    icon: BoxIcon,
    subItems: [
      { title: "Tous les produits", url: "/admin/products" },
      { title: "Catégories", url: "/admin/products/categories" },
    ],
  },
  {
    title: "Consultation",
    url: "/admin/consult",
    icon: SearchIcon,
    subItems: [
      { title: "Consulter le produit", url: "/admin/consult" },
      { title: "Logs des produits", url: "/admin/consult/logs" },
      { title: "Rapports", url: "/admin/consult/reports" },
    ],
  },

];
import { Avatar } from '@/components/Shadcn/Avatar/avatar';


interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
}

interface SidebarUserDropdownProps {
  user: User;
}

const AdminSidebar = ({ user }: SidebarUserDropdownProps) => {


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
      <Sidebar>
        <SidebarHeader className="bg-blue-700 text-white flex flex-col py-4 px-4 items-start">
          <img src={logoWhite} alt="Logo" className="w-43" />
        </SidebarHeader>
        

        <SidebarContent className="bg-blue-700 text-white">
          <SidebarGroupLabel className="text-gray-300 text-base px-4">
            Espace administrateur
          </SidebarGroupLabel>
          <SidebarMenu>
            {adminSidebarItems.map((item) =>
              item.subItems ? (
                <SidebarMenuItem className="px-4 pb-2" key={item.title}>
                  <SidebarMenuButton className="w-full rounded transition-colors flex items-center">
                    <Link to={item.url} className="flex text-base font-bold items-center gap-2 w-full py-2">
                      <item.icon />
                      <span>{item.title}</span>
                      {ChevronRightSvg}
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.subItems.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={sub.url}
                            className={`block text-white px-6 py-4 rounded w-full text-left ${
                              item.title === "Products"
                                ? "hover:bg-white"
                                : "hover:bg-white"
                            }`}
                          >
                            {sub.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem className="px-4 pb-2" key={item.title}>
                  <SidebarMenuButton className="w-full text-base font-bold rounded transition-colors">
                    <Link to={item.url} className="flex items-center gap-2 w-full py-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="bg-blue-700 text-white py-4">
          <SidebarMenu>
            {/* Settings and Logout Dropdown */}
            <SidebarMenuItem className="px-2">
                  <SidebarMenuButton >
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Avatar>
                          {user.photo_profile && getProfileImageUrl(user.photo_profile) ? (
                            <AvatarImage
                              src={getProfileImageUrl(user.photo_profile)}
                              alt={getUserDisplayName(user)}
                            />  
                          ) : null}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{getUserDisplayName(user)}</span>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
}

export default AdminSidebar;
