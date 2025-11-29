import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export default function EaseToolTip({children, tip}: { children?: React.ReactNode, tip: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{tip}</p>
            </TooltipContent>
        </Tooltip>
    );
}