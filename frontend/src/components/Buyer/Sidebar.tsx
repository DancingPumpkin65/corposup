import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/Shadcn/Sidebar/sidebar";
import {
  ShoppingBag,
  User2,
  Truck,
  Heart,
  ShoppingCart
} from "lucide-react";

const buyerItems = [
  { title: "Profil", url: "/buyer/profile", icon: User2 },
  { title: "Historique de commandes", url: "/buyer/orders", icon: ShoppingBag },
  { title: "Suivi de commande", url: "/buyer/tracking", icon: Truck },
  { title: "Produits sauvegardés", url: "/buyer/saved", icon: Heart },
  { title: "Panier", url: "/buyer/cart", icon: ShoppingCart },
];

export function BuyerSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <div className="bg-white pl-2 pt-4 w-full h-full">
        <SidebarContent className="space-y-5">
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-semibold text-gray-300 pb-2">
              Espace acheteur
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="font-semibold bg-white text-lg flex flex-col gap-2 text-gray-500">
                {buyerItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      className="transition-all duration-150 py-2 px-2 rounded-none flex items-center gap-2 text-gray-500 hover:text-gray-400 hover:bg-white border-l border-transparent data-[active=true]:text-orange-500 data-[active=true]:border-blue-600 h-auto bg-white"
                    >
                      <Link to={item.url} className="data-[active=true]:bg-white bg-white">
                        <item.icon style={{ width: "22px", height: "22px" }} />
                        <span className="font-bold text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}

// Styling and structure matches Seller sidebar.
// No changes needed.
