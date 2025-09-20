import type { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg p-6 shadow bg-white w-full">
            {children}
        </div>
    )
}