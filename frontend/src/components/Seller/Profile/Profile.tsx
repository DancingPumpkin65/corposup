import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';
import { useCurrentUser } from '@/hooks';
import { 
  CompanyInfoSection,
  DeleteAccountSection,
  PasswordUpdateSection,
  ProfileInfoSection
} from '@/components/Seller/Profile';
import { Loader } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Shadcn/Tabs"
import { useCompanyInfo } from '@/components/Seller/Profile/CompanyInfo/useCompanyInfo';

const Profile = () => {
  const { user, loading } = useCurrentUser();
  const companyInfo = useCompanyInfo();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600"><Loader className="animate-spin mr-2" />Chargement des informations...</div>
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
      <div className="flex w-full max-w-[1000px] mx-auto flex-col gap-8 py-8 px-4 sm:py-8 sm:px-4">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="company">Entreprise</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="password">Mot de passe</TabsTrigger>
            <TabsTrigger value="delete">Supprimer le compte</TabsTrigger>
          </TabsList>
          <TabsContent value="company">
            <div className="bg-white rounded-lg shadow-sm border">
              <CompanyInfoSection
                formData={companyInfo.formData}
                loading={companyInfo.loading}
                alert={companyInfo.alert}
                showWarning={companyInfo.showWarning}
                handleChange={companyInfo.handleChange}
                handleSubmit={companyInfo.handleSubmit}
              />
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="bg-white rounded-lg shadow-sm border">
              <ProfileInfoSection user={user} />
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="bg-white rounded-lg shadow-sm border">
              <PasswordUpdateSection />
            </div>
          </TabsContent>
          <TabsContent value="delete">
            <div className="bg-white rounded-lg shadow-sm border">
              <DeleteAccountSection />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
};

export default Profile;
