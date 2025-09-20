import type { ReactNode } from "react"

export interface PageHeaderProps {
    icon: ReactNode
    title: string
    description: string
    children?: ReactNode
}

export function PageHeader({ icon, title, description, children }: PageHeaderProps) {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                    {icon}
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-gray-800 text-2xl">{title}</h2>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                {children}
            </div>
        </header >
    )
}