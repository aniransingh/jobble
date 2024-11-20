import { SidebarTrigger } from "../ui/sidebar";

type Props = {
    title?: string;
    children?: React.ReactNode;
};

export default function BaseHeader({ title, children }: Props) {
    return (
        <div className="flex items-center bg-[rgba(0,0,0,0.9)] h-[60px] py-4 pr-4 sticky top-0 z-50">
            <div className="flex item-center gap-4">
                <div className="flex items-center justify-center border-border border-r-[1px] pr-2 ml-4">
                    <SidebarTrigger variant="3d-white" className="h-8 w-8 p-1" />
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-[1.175rem]">{title}</h1>
                </div>
            </div>
            {children}
        </div>
    );
}
