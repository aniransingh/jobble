import Link from "next/link";
import BaseHeader from "./BaseHeader";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

type Params = {
    count?: number;
};

export default function JobsHeader({ count }: Params) {
    return (
        <BaseHeader title="Jobs">
            <div className="flex items-center justify-between w-full pl-2">
                <span className="flex items-center justify-center bg-text-primary text-text-primary-alt rounded-full w-[24px] h-[24px]">
                    {count}
                </span>
                {/* <Link href="/dashboard/jobs/create">
                    <div className="w-[32px] h-[32px] flex items-center justify-center rounded-md hover:bg-text-primary hover:text-text-primary-alt transition-all ease-linear">
                        <CirclePlus className="h-[26px] w-[26px]" />
                    </div>
                </Link> */}
                <Link href="/dashboard/jobs/create">
                    <Button variant="3d-white" size="sm">
                        <CirclePlus className="h-[26px] w-[26px]" />
                    </Button>
                </Link>
            </div>
        </BaseHeader>
    );
}
