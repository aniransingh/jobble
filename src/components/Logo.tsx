import { BriefcaseBusiness } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex h-[40px] items-center justify-center gap-2">
            <span className="flex items-center justify-center bg-accent rounded-full w-[40px] h-[40px]"><BriefcaseBusiness /></span>
            <h1 className="font-bold text-2xl mt-[1px]">Jobble</h1>
        </div>
    );
}
