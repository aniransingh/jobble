import { fetchJobs as fetchJobsAction } from "@/actions/jobActions";
import DashboardHeader from "@/components/DashoardHeader";
import JobCard from "@/components/JobCard";
// import { JobDocument } from "@/db/model/Job.model";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

// const MAX_RETRIES = 3;

export default async function JobsPage() {
    // ! Need db failure measure
    const { data: jobs } = await fetchJobsAction();
    // const jobs: JobDocument[] = [];
    // const [jobs, setJobs] = useState<JobDocument[] | null>(null);
    // const [error, setError] = useState<String | null>(null);
    // const [retryCount, setRetryCount] = useState<number>(0);

    // const fetchJobs = async () => {
    //     const { success, message, data } = await fetchJobsAction();

    //     if (success) {
    //         setJobs(data);
    //     } else {
    //         setError(message);
    //     }
    // };

    // useEffect(() => {
    //     fetchJobs();
    // });

    return (
        <div className="w-full h-full">
            {/* Header */}
            <DashboardHeader title="Jobs">
                <div className="flex items-center justify-between w-full pl-2">
                    <span className="flex items-center justify-center bg-text-primary text-text-primary-alt rounded-full w-[24px] h-[24px]">
                        {jobs ? jobs.length : 0}
                    </span>
                    <Link href="/dashboard/jobs/create">
                        <div className="h-[40px] px-3 gap-2 flex items-center justify-center bg-button rounded-full hover:bg-accent-hover">
                            <CirclePlus />
                            <span className="text-sm">Create</span>
                        </div>
                    </Link>
                </div>
            </DashboardHeader>
            {/* Job Cards */}
            <div className="flex flex-1 justify-center items-center p-4">
                {jobs && jobs.length !== 0 ? (
                    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {jobs?.map((job, id) => (
                            <JobCard
                                {...job}
                                jobId={job._id.toString()}
                                iterationId={id}
                                key={id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg flex h-full w-full items-center justify-center relative">
                        <div className="flex flex-col items-center justify-center gap-10">
                            <h1 className="text-3xl">No jobs found 😔</h1>
                            <p>1. But you can create one 😃</p>
                        </div>
                        <p className="absolute top-0 right-10 border-accent ">
                            2. Just click right here ☝️
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
