import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

export interface CardProps {
    title: string
    value: string
    icon: ReactNode
    color: string
    status?: 'PENDING' | 'APPROVED' | 'DENIED';
    select?: boolean
    onSetFiltering?: (status: 'PENDING' | 'APPROVED' | 'DENIED') => void
}

export function CardComponent({ title, value, icon, color, onSetFiltering, status, select }: CardProps) {
    return (
        <Card
            onClick={() => status && onSetFiltering?.(status)}
            className={`flex h-20 items-center justify-center p-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow ${(select && status === 'PENDING') && 'border border-amber-500 bg-amber-50'} ${(select && status === 'APPROVED') && 'border border-emerald-500 bg-emerald-50'} ${(select && status === 'DENIED') && 'border border-red-500 bg-red-50'}`}
        >
            <div className="flex items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-600">{title}</span>
                    <span className="text-2xl text-shadow-2xs font-bold text-gray-900">{value}</span>
                </div>
                <div className={`bg-${color}-100 text-${color}-500 p-2 rounded-lg`}>
                    {icon}
                </div>
            </div>
        </Card>
    )
}