import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ApplicationStatus, LocationType } from "@/lib/enums";

import Link from "next/link";

type Props = {
    jobId: string;
    iterationId: number;
    role: string;
    company: string;
    appliedOn: Date;
    city?: string;
    state?: string;
    country?: string;
    status: ApplicationStatus;
    locationType: LocationType;
};

export default function JobCard({
    jobId,
    iterationId,
    role,
    company,
    appliedOn,
    city,
    state,
    country,
    status,
    locationType,
}: Props) {
    const { Pending, Rejected, Interview } = ApplicationStatus;
    const gradientIndex = (iterationId % 10) + 1;
    const stateColors = {
        [Pending]: "#FCF75E",
        [Rejected]: "#FF6347",
        [Interview]: "#318CE7",
    };

    let location = "";
    // ! Old data does not have * locationType * field in db
    // if (locationType == LocationType.Physical) {
    //     location = city + ", " + state + ", " + country;
    // } else if (locationType == LocationType.Remote) {
    //     location = country ? "Remote, " + country : "Remote";
    // }

    if (locationType == LocationType.Remote) {
        location = country ? "Remote, " + country : "Remote";
    } else {
        location = city + ", " + state + ", " + country;
    }

    const truncateField = (field: string, maxCharLen?: number): string => {
        const defaultMaxCharLen = 29;

        const maxLength = maxCharLen || defaultMaxCharLen;
        return field.length > maxLength
            ? field.substring(0, maxLength) + "..."
            : field;
    };

    location = truncateField(location);
    company = truncateField(company, 25);
    role = truncateField(role, 40);

    return (
        <Card className="h-[300px] bg-secondary border-border text-text-primary rounded-xl">
            <CardContent className="flex flex-col justify-center p-0 h-full ">
                <div
                    className="flex flex-1 flex-col p-4 rounded-lg mx-[5px] mt-[5px]"
                    style={{
                        backgroundImage: `var(--grad-card-${gradientIndex})`,
                    }}
                >
                    <div className="flex flex-col gap-3 ">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-text-primary-alt">
                                {appliedOn.toDateString()}
                            </p>
                            <p
                                className=" rounded-full w-[26px] h-[12px] text-xs text-text-primary-alt"
                                style={{
                                    backgroundColor: stateColors[status],
                                }}
                            ></p>
                        </div>
                        <p className="text-[1.7rem] font-light text-text-primary-alt">
                            {role}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-2 px-4 h-[60px]">
                    <div className="flex flex-col">
                        <p className="font-semibold">{company}</p>
                        <div className="flex text-sm">
                            <p>{location}</p>
                        </div>
                    </div>
                    <Link href={`/dashboard/jobs/${jobId}`}>
                        <Button type="button" variant="custom" className=" rounded-full">
                            View
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
