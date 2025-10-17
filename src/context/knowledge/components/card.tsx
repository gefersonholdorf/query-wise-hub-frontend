/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Bug, Calendar, Circle, EllipsisVertical, Eye, Library, ListCheck, ListChecks, MessageCircle, MessageSquare, MessageSquareCode, SquarePen, Tag, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router';

dayjs.locale('pt-br');

export interface CardProps {
    knowledge: {
        id: number,
        problems: string[]
        solution: string
        views: number
        createdAt: Date
        createdBy: string
        tags: string | null
        status: 'PENDING' | 'APPROVED' | 'DENIED'
    }
}

export function Card({ knowledge }: CardProps) {
    const navigate = useNavigate()

    return (
        <div
            className="group flex flex-col justify-between border border-gray-200 h-75 gap-1 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.25)] relative overflow-hidden p-4"
        >
            <div className='border-b border-b-gray-100 rounded-t-2xl flex flex-col gap-2 pb-4'>
                <div className='px-4 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2'>
                        <h3 className=" text-gray-800 font-semibold  flex items-center gap-2">{truncatedText({ text: knowledge.problems[0], max: 50 })}</h3>
                    </div>
                    <div className='p-2 hover:bg-gray-100 rounded-sm cursor-pointer'>
                        <EllipsisVertical size={20} className='text-gray-700' />
                    </div>
                </div>
                <div className='flex items-center px-4 gap-2'>
                    <Circle className='text-sky-600' size={15} />
                    <span className='text-sm text-gray-700'>{knowledge.problems.length} problemas </span>
                </div>
            </div>
            <div className="px-4 mt-2 min-h-15 border border-gray-200 bg-gray-50 rounded-sm p-2">
                <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    SOLUÇÃO
                </span>
                <Tooltip>
                    <TooltipTrigger className='text-start w-full'>
                        <p className="text-[0.8rem] text-gray-700 mt-1 block w-full">
                            {truncatedText({ text: knowledge.solution, max: 80 })}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{knowledge.solution}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className='flex items-center justify-between p-4 border-t border-t-gray-100 rounded-b-2xl'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <Tooltip>
                            <TooltipTrigger className='text-start'>
                                <Eye className='text-gray-500' size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantidade de visualizações.</p>
                            </TooltipContent>
                        </Tooltip>
                        <span className='text-[0.9rem] text-gray-500'>{knowledge.views}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Tooltip>
                            <TooltipTrigger className='text-start'>
                                <MessageSquare className='text-gray-500' size={15} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantidade de comentários.</p>
                            </TooltipContent>
                        </Tooltip>
                        <span className='text-[0.9rem] text-gray-500'>{knowledge.views}</span>
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <Button className='text-sky-500 hover:bg-sky-100 hover:text-sky-600 cursor-pointer' variant="ghost" onClick={() => navigate(`/knowledge/${knowledge.id}`)}>Ver Detalhes</Button>
                    </div>
                </div>
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-sky-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
        </div>
    )
}