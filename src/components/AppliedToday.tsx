import { fetchCountJobsAppliedToday } from "@/actions/jobActions";
import { TriangleAlert } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

export default async function AppliedToday() {
    const {
        success,
        data: countJobsAppliedToday,
        message,
    } = await fetchCountJobsAppliedToday();

    const defaultStyles =
        "border-[1px] flex items-center gap-8 p-2 px-4 rounded-xl text-text-primary h-[70px]";

    return (
        <>
            {success ? (
                <div className={`${defaultStyles}`}>
                    <h1>Jobs Applied Today</h1>
                    <span className="flex items-center justify-center text-xl font-medium border-border border-[1px] min-w-[36px] h-[36px] px-2 rounded-full text-accent">
                        {countJobsAppliedToday}
                    </span>
                </div>
            ) : (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className={`${defaultStyles} border-red-500 cursor-help`}
                            >
                                <h1>Jobs Applied Today</h1>
                                <span className="text-red-500">
                                    <TriangleAlert />
                                </span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>{message}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    );
}
