import AppliedToday from "@/components/AppliedToday";
import DashboardHeader from "@/components/DashoardHeader"

export default function DashboardPage() {
    return (
        <div>
            <DashboardHeader title="Dashboard" />
            <div className="flex p-4">
                <AppliedToday />
            </div>
        </div>
    );
}
