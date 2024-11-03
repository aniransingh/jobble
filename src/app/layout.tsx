import { jetBrainsMono, robotoMono } from "@/app/styles/fonts";
import "@/app/styles/globals.css";

export const metadata = {
    title: "Jobble",
    description: "Gobble em' jobs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${robotoMono.className} antialiased bg-primary text-text-primary`}
            >
                {children}
            </body>
        </html>
    );
}
