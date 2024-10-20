"use client";

import { Button } from "@/components/ui/button";

export default function JobsErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="flex h-full items-center justify-center p-4">
            <div className="flex h-full w-full rounded-lg flex-col items-center justify-center bg-[#FFE4E1] gap-4">
                <h1 className="text-xl">Unable to fetch your jobs 😖</h1>
                <Button className="rounded-full" onClick={() => reset()}>
                    Try again?
                </Button>
            </div>
        </div>
    );
}
