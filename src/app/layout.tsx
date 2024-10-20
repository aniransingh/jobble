import { jetBrainsMono } from "@/styles/fonts";
import "@/styles/globals.css";

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
            <body className={`${jetBrainsMono.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
