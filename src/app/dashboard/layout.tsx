import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen relative">
            <Sidebar />
            <div className="w-full ml-[200px] overflow-y-scroll">{children}</div>
        </div>
    );
}
