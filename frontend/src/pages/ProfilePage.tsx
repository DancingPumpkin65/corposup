import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/Shadcn/Sidebar/sidebar';
import { MainLayout } from '../components/layouts/MainLayout';
import { useCurrentUser } from '../hooks';
import { 
  CompanyInfoSection,
  DeleteAccountSection,
  PasswordUpdateSection,
  ProfileInfoSection
} from '../components/ProfilePage';
import { SellerSidebar } from "../components/SellerPage/Sidebar";

const ProfilePage = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-gray-600">Chargement des informations...</div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-red-600">Erreur lors du chargement des informations utilisateur</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SidebarProvider className="relative">
        <SellerSidebar />
        <SidebarInset>
          <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Mon Profil</h1>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-8 pt-4 pb-8">
            <div className="max-w-7xl mx-auto w-full px-2 lg:px-8 space-y-8">
              
                {/* Company Information Section */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <CompanyInfoSection />
                </div>

                {/* Profile Information Section */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <ProfileInfoSection user={user} />
                </div>

                {/* Password Update Section */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <PasswordUpdateSection />
                </div>

                {/* Delete Account Section */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <DeleteAccountSection />
                </div>

            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </MainLayout>
  );
};

export default ProfilePage;
