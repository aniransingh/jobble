import { fetchJobs as fetchJobsAction } from "@/actions/jobActions";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const MAX_RETRIES = 3;

export default async function JobsPage() {
    const {data: jobs} = await fetchJobsAction();
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
        <div className="flex flex-col w-full h-full">
            <div className="flex justify-between h-[70px] py-4 px-8">
                <h1 className="text-3xl">Jobs</h1>
                <Button type="button">
                    <Link href="/dashboard/jobs/create">Create</Link>
                </Button>
            </div>
            <div className="flex justify-center items-center p-4 h-full">
                {jobs && jobs.length !== 0 ? (
                    <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
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
                    <div className="rounded-lg bg-[#CCCCFF] flex h-full w-full items-center justify-center">
                        <h1 className="text-3xl">No jobs found 😔</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
