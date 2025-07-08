import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';
import { useCurrentUser } from '@/hooks';
import { 
  CompanyInfoSection,
  DeleteAccountSection,
  PasswordUpdateSection,
  ProfileInfoSection
} from '@/components/Seller/Profile';

const Profile = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Chargement des informations...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Erreur lors du chargement des informations utilisateur</div>
      </div>
    );
  }

  return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Mon Profil</h1>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-8 py-8 px-4 sm:py-8 sm:px-4">
          <div className="w-full space-y-4">
            
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
  );
};

export default Profile;
