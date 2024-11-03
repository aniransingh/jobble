import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <SidebarProvider>
            <div className="flex w-screen h-screen relative">
                <AppSidebar />
                <div className="w-full overflow-y-scroll">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
