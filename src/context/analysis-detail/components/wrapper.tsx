import type { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg bg-transparent w-full h-full flex flex-col gap-4 mt-2">
            {children}
        </div>
    )
}