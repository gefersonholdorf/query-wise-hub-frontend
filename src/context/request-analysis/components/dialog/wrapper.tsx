import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface RequestDialogWrapperProps {
    childrenTrigger: ReactNode
    children: ReactNode
}

export function RequestDialogWrapper({ childrenTrigger, children }: RequestDialogWrapperProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {childrenTrigger}
            </DialogTrigger>
            <DialogContent className="min-w-200">
                {children}
            </DialogContent>
        </Dialog>
    )
}