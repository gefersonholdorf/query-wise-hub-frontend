import type { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg p-6 bg-white w-full mt-6 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            {children}
        </div>
    )
}