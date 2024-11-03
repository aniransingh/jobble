import { fetchJobById } from "@/actions/jobActions";
import DashboardHeader from "@/components/DashoardHeader";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LocationType } from "@/lib/enums";
import { cn } from "@/lib/utils";

type ItemParams = {
    title: string;
    children: React.ReactNode;
    gradient?: string;
    itemIndex: number;
};

function Item({ title, children, gradient, itemIndex }: ItemParams) {
    const gradientIndex = (itemIndex % 10) + 1;

    return (
        <div className="flex flex-col border-border border-[1px] rounded-lg">
            <p
                className="px-4 py-2 rounded-lg rounded-b-none text-md border-border border-b-[1px] text-text-primary-alt"
                style={{
                    backgroundImage: `var(--grad-card-${gradientIndex})`,
                }}
            >
                {title}
            </p>
            <div
                className={cn(
                    "p-4 rounded-lg rounded-t-none text-[0.925rem] bg-secondary",
                    gradient
                )}
            >
                {children}
            </div>
        </div>
    );
}

export default async function JobDetails({
    params,
}: {
    params: { id: string };
}) {
    const { data: job } = await fetchJobById(params.id);

    if (!job) {
        return <div>Error</div>;
    }

    let location = "";
    if (job.locationType == LocationType.Remote) {
        location = job.country ? "Remote, " + job.country : "Remote";
    } else {
        location = job.city + ", " + job.state + ", " + job.country;
    }

    let itemIndex = 1;

    return (
        <div>
            <DashboardHeader>
                <Breadcrumb>
                    <BreadcrumbList className="breadcrum">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/jobs" className="breadcrum-link">Jobs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="breadcrum-page">{params.id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </DashboardHeader>
            <div className="flex flex-col p-4 gap-4">
                <div className="flex gap-6">
                    <Item title="Role" itemIndex={itemIndex++}>
                        <p>{job.role}</p>
                    </Item>
                    <Item title="Company" itemIndex={itemIndex++}>
                        <p>{job.company}</p>
                    </Item>
                    <Item title="Location" itemIndex={itemIndex++}>
                        <p>{location}</p>
                    </Item>
                </div>
                <div className="flex flex-col gap-2">
                    <Item title="Job Description" itemIndex={itemIndex++}>
                        <pre className="whitespace-pre-wrap">
                            {job?.jobDescription}
                        </pre>
                    </Item>
                </div>
            </div>
        </div>
    );
}
