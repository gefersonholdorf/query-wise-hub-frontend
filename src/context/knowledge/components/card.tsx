/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Bug, Calendar, EllipsisVertical, Eye, SquarePen, Tag, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router';

dayjs.locale('pt-br');

export interface CardProps {
    knowledge: {
        id: number,
        problems: string[]
        solution: string
        createdAt: Date
        createdBy: string
        tags: string | null
        status: 'PENDING' | 'APPROVED' | 'DENIED'
    }
}

export function Card({ knowledge }: CardProps) {
    const navigate = useNavigate()

    return (
        <div className="group flex flex-col justify-between h-85 gap-1 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow border-3 hover:border-blue-300">
            <div className='p-4 flex items-start justify-between gap-4 bg-gray-50 border-b vorder-b-gray-100 rounded-t-2xl'>
                <h3 className=" text-gray-800 font-bold group-hover:text-sky-500">{truncatedText({ text: knowledge.problems[0], max: 60 })}</h3>
                <div className='p-2 hover:bg-gray-100 rounded-sm cursor-pointer'>
                    <EllipsisVertical size={20} className='text-gray-700' />
                </div>
            </div>
            <div className='px-4'>
                <span className='text-sm text-gray-500 font-medium'>PROBLEMAS</span>
                {knowledge.problems.map((problem, index) => {
                    if (index <= 1) {
                        return <div key={index.toString()} className='flex items-center gap-1'>
                            <Bug size={15} className='text-orange-500' />
                            <span className='text-[0.8rem] text-gray-500'>{truncatedText({ text: problem, max: 40 })}</span>
                        </div>
                    }

                    return null
                })}
                {knowledge.problems.length > 2 && (
                    <span className='text-[0.8rem] text-gray-500'>+ {knowledge.problems.length - 2} problemas...</span>
                )}
            </div>
            <div className="px-4 mt-2 min-h-15">
                <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    SOLUÇÃO
                </span>
                <Tooltip>
                    <TooltipTrigger className='text-start'>
                        <p className="text-[0.85rem] text-gray-700 mt-1">
                            {truncatedText({ text: knowledge.solution, max: 80 })}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{knowledge.solution}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className='flex items-center justify-between bg-gray-50 p-4 border-t border-t-gray-100 rounded-b-2xl'>
                <div className='flex items-center gap-1'>
                    <Eye />
                    <span className='text-[0.8rem] text-gray-500'>40 visualizações</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Button className='text-sky-500 hover:bg-sky-100 hover:text-sky-600 cursor-pointer' variant="ghost">Ver Detalhes</Button>
                </div>
            </div>
        </div>
    )
}