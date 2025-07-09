import { Link } from 'react-router-dom';
import { HomeIcon, BoxIcon, SearchIcon, SettingsIcon, LogOutIcon, ChevronUp, UserIcon } from 'lucide-react';
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

const AdminSidebar = () => {
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-blue-700 hover:text-white rounded transition-colors flex items-center">
                    <span className="flex items-center gap-2 w-full py-2">
                      <SettingsIcon />
                      <span>Settings</span>
                      <ChevronUp className="ml-auto" />
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] bg-white text-black border-none shadow-lg">
                  <DropdownMenuItem className='h-8'>
                    <a href="/settings" className="flex items-center gap-2 w-full py-2">
                      <UserIcon className='w-6' />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='h-8'>
                    <a href="/logout" className="flex items-center gap-2 w-full py-2">
                      <LogOutIcon className='w-6' />
                      <span>Logout</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
}

export default AdminSidebar;
