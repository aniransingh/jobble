import Link from "next/link";
import Logo from "./Logo";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { it } from "node:test";
import { LayoutDashboard, Pizza } from "lucide-react";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Jobs",
        url: "/dashboard/jobs",
        icon: Pizza,
    },
];

const jobsItems = [
    {
        title: "Create Job",
        url: "/dashboard/jobs/create",
    },
];

export default function AppSidebar() {
    return (
        <Sidebar className="bg-primary border-border">
            <SidebarHeader>
                <div className="flex items-start h-[80px] pt-2">
                    <Logo />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item, index) => (
                        <SidebarMenuItem
                            key={index}
                            className="px-2 hover:bg-[#1a1a1a]"
                        >
                            <SidebarMenuButton>
                                <a
                                    href={item.url}
                                    className="flex items-center gap-2"
                                >
                                    <item.icon />
                                    <span className="">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
        // <div className="flex flex-col fixed top-0 left-0 border-r-2 gap-8 p-4 h-screen w-[200px]">
        //     <Logo />
        //     <div className="flex flex-col">
        //         <Link href="/dashboard">Dashboard</Link>
        //         <Link href="/dashboard/jobs">Jobs</Link>
        //     </div>
        // </div>
    );
}
