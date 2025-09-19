import type { ReactNode } from "react";
import { tv } from 'tailwind-variants';

export const activeVariant = tv({
    base: 'w-full p-3 pl-6 text-gray-700 flex items-center gap-2',
    variants: {
        active: {
            select: 'bg-blue-100 rounded-lg text-blue-500 font-semibold',
            default: 'hover:bg-blue-100 hover:rounded-lg hover:text-blue-500 hover:font-semibold font-semibold text-gray-600'
        }
    },
    defaultVariants: {
        active: 'default'
    }
})

export interface NavComponent {
    icon: ReactNode
    title: string,
    active?: 'select' | 'default'
}

export function NavComponent({ icon, title, active = 'default' }: NavComponent) {
    return (
        <div className={activeVariant({ active })}>
            {icon}
            <span className="text-[0.8rem]">{title}</span>
        </div>
    )
}