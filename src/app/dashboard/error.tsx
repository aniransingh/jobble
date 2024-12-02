"use client";

import BaseHeader from "@/components/headers/BaseHeader";
import { Button } from "@/components/ui/button";

export default function JobsErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="page">
            <BaseHeader title="Jobs" />
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
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
