"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUpPage() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Fill out the fields below to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="E.g. Luke"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            {/* Last Name */}
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="E.g. Skywalker"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="E.g. luke.skywalker@tatooine.net"
                                                    {...field}
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Choose a strong password"
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Re-enter your strong password"
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <Link href="/signin">Already have an account?</Link>
                            <Button type="submit">Sign Up</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
