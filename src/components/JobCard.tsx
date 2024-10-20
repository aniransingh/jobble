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
    const cardColors = ["#f9f6fe", "#fef4e3", "#f7fcec", "#fefcea", "#f9f0f0"];
    const stateColors = {
        [Pending]: "#FFFACD",
        [Rejected]: "red-400",
        [Interview]: "blue-400",
    };

    const MAX_LOCATION_CHAR_LEN = 29;
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

    if (location.length > MAX_LOCATION_CHAR_LEN) {
        location = location.substring(0, MAX_LOCATION_CHAR_LEN) + "...";
    }

    return (
        <Card>
            <CardContent className="flex flex-col p-1 h-full ">
                <div
                    className="flex flex-1 flex-col p-4"
                    style={{
                        backgroundColor:
                            cardColors[iterationId % cardColors.length],
                    }}
                >
                    <div className="flex flex-col gap-3 ">
                        <div className="flex justify-between items-center">
                            <p className="text-sm">
                                {appliedOn.toDateString()}
                            </p>
                            <p
                                className=" rounded-full py-[2px] px-2 text-sm"
                                style={{
                                    backgroundColor: stateColors[status],
                                }}
                            >
                                {status}
                            </p>
                        </div>
                        <p className="text-[1.735rem] font-light">{role}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center flex-none p-2 ">
                    <div className="flex flex-col">
                        <p className="font-semibold">{company}</p>
                        <div className="flex text-sm">
                            <p>{location}</p>
                        </div>
                    </div>
                    <Link href={`/dashboard/jobs/${jobId}`}>
                        <Button type="button" className="rounded-full">
                            View
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
