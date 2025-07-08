import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';

const Overview = () => {
  return (
    <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="-ml-1" />
        </header>
    </SidebarInset>
  );
};

export default Overview;
