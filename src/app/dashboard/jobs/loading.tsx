import { Skeleton } from "@/components/ui/skeleton";

export default function JobsLoadingPage() {
    const skeletonCount = 6;
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex justify-between h-[70px] py-4 px-8">
                <h1 className="text-3xl">Jobs</h1>
                <Skeleton className="rounded-full w-[100px] h-[50px]" />
            </div>
            <div className="flex justify-center items-center p-4 h-full">
                <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
                    {Array.from({ length: skeletonCount }, (_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton className="rounded-lg w-[400px] h-[200px]" />
                            <Skeleton className="rounded-lg w-[360px] h-[30px]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
