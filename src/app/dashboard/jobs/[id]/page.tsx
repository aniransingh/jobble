import { fetchJobById } from "@/actions/jobActions";

export default async function JobDetails({
    params,
}: {
    params: { id: string };
}) {
    const {data: job} = await fetchJobById(params.id);

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-medium">Job Description</h1>
                <div className="text-sm p-4 bg-slate-100 rounded-lg">
                    <pre className="whitespace-pre-wrap">
                        {job?.jobDescription}
                    </pre>
                </div>
            </div>
        </div>
    );
}
