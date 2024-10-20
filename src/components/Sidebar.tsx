import Link from "next/link";
import Logo from "./Logo";

export default function Sidebar() {
    return (
        <div className="flex flex-col fixed top-0 left-0 border-r-2 gap-8 p-4 h-screen w-[200px]">
            <Logo />
            <div className="flex flex-col">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/jobs">Jobs</Link>
            </div>
        </div>
    );
}
