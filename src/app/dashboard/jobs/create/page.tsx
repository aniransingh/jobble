"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ApplicationStatus, LocationType } from "@/lib/enums";
import { createJobSchema } from "@/validation/job.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsLeftRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createJob } from "@/actions/jobActions";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import BaseHeader from "@/components/headers/BaseHeader";

export default function CreateJobPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof createJobSchema>>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            role: "",
            company: "",
            appliedOn: new Date(),
            // ! Needs to be "" to show placeholder, but ts is screaming murder!
            // ! see createJobSchema for more deets
            salary: 0,
            locationType: LocationType.Physical,
            city: "",
            state: "",
            country: "",
            status: ApplicationStatus.Pending,
            jobListingSource: "",
            jobApplicationPlatform: "",
            jobDescription: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof createJobSchema>) => {
        const { success } = await createJob(values);

        if (success) {
            router.push("/dashboard/jobs");
        }
    };

    const statusOptions = Object.entries(ApplicationStatus).map(
        ([label, value]) => ({
            label,
            value,
        })
    );

    console.log(form.formState.errors);

    const locationType = form.watch("locationType");

    return (
        <div>
            <BaseHeader>
                <Breadcrumb>
                    <BreadcrumbList className="breadcrum">
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/dashboard/jobs"
                                className="breadcrum-link"
                            >
                                Jobs
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="breadcrum-page">
                                Create Job
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </BaseHeader>
            <div className="flex p-4">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4 p-4"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        {/* Role */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Role
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="form-input"
                                                placeholder="E.g. Backend Developer"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Company */}
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Company
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="form-input"
                                                placeholder="E.g. Google"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="label">Location</p>
                            <FormField
                                control={form.control}
                                name="locationType"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex items-center gap-2">
                                            <FormControl className="bg-sky-400">
                                                <Switch
                                                    className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-border"
                                                    id="location-remote"
                                                    checked={
                                                        field.value ===
                                                        LocationType.Remote
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        field.onChange(
                                                            checked
                                                                ? LocationType.Remote
                                                                : LocationType.Physical
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className="pb-2">
                                                Remote
                                            </FormLabel>
                                        </FormItem>
                                    );
                                }}
                            ></FormField>

                            <div className="flex gap-2">
                                {/* City */}
                                {locationType === LocationType.Physical && (
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="label">
                                                        City
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="form-input"
                                                            placeholder="E.g. Bangalore"
                                                            {...field}
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                )}
                                {/* State */}
                                {locationType === LocationType.Physical && (
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="label">
                                                        State
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="form-input"
                                                            placeholder="E.g. Karnataka"
                                                            {...field}
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                )}
                                {/* Country */}
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="label">
                                                    Country
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="form-input"
                                                        placeholder="E.g. India"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {/* Salary */}
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Salary (in LPA)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="form-input"
                                                placeholder="E.g. 15"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        {/* Job Listing Source */}
                        <FormField
                            control={form.control}
                            name="jobListingSource"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Job Listing Source
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="form-input"
                                                placeholder="E.g. Linkedin"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Job Application Platform */}
                        <FormField
                            control={form.control}
                            name="jobApplicationPlatform"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Job Application Platform
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="form-input"
                                                placeholder="E.g. Company Portal"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col gap-[3px]">
                                        <FormLabel className="label">
                                            Status
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className="form-btn gap-4 relative p-0 mt-0"
                                                        type="button"
                                                        variant="outline-custom"
                                                    >
                                                        {field.value
                                                            ? statusOptions.find(
                                                                  (status) =>
                                                                      status.value ===
                                                                      field.value
                                                              )?.label
                                                            : "Select status"}
                                                        <ChevronsLeftRightIcon className="h-4 w-4 rotate-90 absolute right-5" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Command>
                                                    <CommandInput placeholder="Search status..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No status found
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {statusOptions.map(
                                                                (status) => (
                                                                    <CommandItem
                                                                        value={
                                                                            status.label
                                                                        }
                                                                        key={
                                                                            status.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "status",
                                                                                status.value
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            status.label
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "h-4 w-4",
                                                                                status.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Applied On */}
                        <FormField
                            control={form.control}
                            name="appliedOn"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col gap-[3px]">
                                        <FormLabel className="label">
                                            Applied On
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className="form-btn gap-4 relative"
                                                        type="button"
                                                        variant="outline-custom"
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="h-4 w-4 absolute right-5" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Job Description */}
                        <FormField
                            control={form.control}
                            name="jobDescription"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="label">
                                            Job Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="input w-[1188px]"
                                                placeholder="Dump the job description here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="3d"
                            className="form-btn form-submit-btn"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
