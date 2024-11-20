"use client";

import BaseHeader from "@/components/headers/BaseHeader";
import JobsHeader from "@/components/headers/JobsHeader";
import { Button } from "@/components/ui/button";

export default function JobsErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="page">
            <BaseHeader title="Jobs" />
            <div className="flex h-full w-full rounded-lg flex-col items-center justify-center gap-4">
                <h1 className="text-xl">Unable to fetch your jobs 😖</h1>
                <Button
                    variant="custom"
                    className="rounded-full"
                    onClick={() => reset()}
                >
                    Try again?
                </Button>
            </div>
        </div>
    );
}
