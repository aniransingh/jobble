import { fetchJobs as fetchJobsAction } from "@/actions/jobActions";
import JobsHeader from "@/components/headers/JobsHeader";
import JobCard from "@/components/JobCard";

export default async function JobsPage() {
    // ! error.tsx's reset() not functioning

    const jobs = await fetchJobsAction();

    return (
        <div className="page">
            <JobsHeader count={jobs ? jobs.length : 0} />
            <div className="flex flex-1 justify-center items-center p-4">
                {jobs && jobs.length !== 0 ? (
                    <div className="w-full h-full grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {jobs?.map((job, id) => (
                            <JobCard
                                {...job}
                                jobId={job._id.toString()}
                                iterationId={id}
                                key={job._id.toString()}
                            />
                        ))}
                    </div>
                ) : (
                    <CreateJobTutorial />
                )}
            </div>
        </div>
    );
}

function CreateJobTutorial() {
    return (
        <div className="rounded-lg flex h-full w-full items-center justify-center relative ">
            <div className="flex flex-col items-center justify-center gap-12">
                <h1 className="text-3xl">No jobs found 😔</h1>
                <p>1. But you can create one 😃</p>
            </div>
            <p className="absolute top-0 right-5 border-accent ">
                2. Just click right here ☝️
            </p>
        </div>
    );
}
