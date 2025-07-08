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
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Users",
    icon: UserIcon,
    subItems: [
      { title: "View Users", url: "/users" },
      { title: "Add User", url: "/users/add" },
      { title: "User Roles", url: "/users/roles" },
    ],
  },
  {
    title: "Products",
    icon: BoxIcon,
    subItems: [
      { title: "All Products", url: "/products" },
      { title: "Add Product", url: "/products/add" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
  {
    title: "Consulting",
    icon: SearchIcon,
    subItems: [
      { title: "Consult Product", url: "/consult" },
      { title: "Product Logs", url: "/consult/logs" },
      { title: "Reports", url: "/consult/reports" },
    ],
  },
];

const AdminSidebar = () => {
  return (
      <Sidebar>
        <SidebarHeader className="bg-blue-600 text-white flex flex-col py-4 px-4 items-start">
          <img src={logoWhite} alt="Logo" className="w-43" />
        </SidebarHeader>
        <SidebarContent className="bg-blue-600 text-white">
          <SidebarGroupLabel className="text-gray-300 text-base px-4">
            Espace administrateur
          </SidebarGroupLabel>
          <SidebarMenu>
            {adminSidebarItems.map((item) =>
              item.subItems ? (
                <SidebarMenuItem className="px-4" key={item.title}>
                  <SidebarMenuButton className="w-full hover:bg-white rounded transition-colors flex items-center">
                    <span className="flex items-center gap-2 w-full py-2">
                      <item.icon />
                      <span>{item.title}</span>
                      {ChevronRightSvg}
                    </span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.subItems.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href={sub.url}
                            className={`block px-6 py-2 rounded w-full text-left ${
                              item.title === "Products"
                                ? "hover:bg-white/50"
                                : "hover:bg-white/50"
                            }`}
                          >
                            {sub.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem className="px-4" key={item.title}>
                  <SidebarMenuButton className="w-full hover:bg-white rounded transition-colors">
                    <a href={item.url} className="flex items-center gap-2 w-full py-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="bg-blue-600 text-white py-4">
          <SidebarMenu>
            {/* Settings and Logout Dropdown */}
            <SidebarMenuItem className="px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-white rounded transition-colors flex items-center">
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
