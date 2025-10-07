/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <"explanation"> */
/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Calendar, Check, Edit, Eye, MessageSquare, Tag, User, X } from 'lucide-react';
import { RequestDialogComponent } from './dialog/main';
import { RequestDialogConfirmComponent } from './dialog-confirm/main';

dayjs.locale('pt-br');

export interface CardProps {
    id: number
    problems: string[]
    solution: string
    createdBy: string
    createdAt: Date
    status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export function RequestCard({ id, problems, solution, createdBy, createdAt, status }: CardProps) {
    return (
        <div className="group flex flex-col gap-4 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.00] hover:shadow-lg shadow p-4 border-2 hover:border-blue-300">
            <div className='flex items-center justify-between'>
                {status === 'PENDING' && <Badge className='bg-amber-500 text-white'>Pendente</Badge>}
                {status === 'APPROVED' && <Badge className='bg-emerald-500 text-white'>Aprovado</Badge>}
                {status === 'DENIED' && <Badge className='bg-red-500 text-white'>Negado</Badge>}

                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">

                    <Tooltip>
                        <TooltipTrigger>
                            <RequestDialogComponent action='view'>
                                <div className='hover:bg-blue-50 hover:text-blue-700 p-2 rounded-sm'>
                                    <Eye size={20} />
                                </div>
                            </RequestDialogComponent>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Visualizar Solicitação</p>
                        </TooltipContent>
                    </Tooltip>
                    {status === 'PENDING' && (
                        <>
                            <Tooltip>
                                <TooltipTrigger>
                                    <RequestDialogComponent action='edit'>
                                        <div className='hover:bg-blue-50 hover:text-blue-700 p-2 rounded-sm'>
                                            <Edit size={20} />
                                        </div>
                                    </RequestDialogComponent>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Editar Solicitação</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <RequestDialogConfirmComponent type='APPROVED' id={id}>
                                        <div className='hover:bg-emerald-50 hover:text-emerald-500 p-2 rounded-sm'>
                                            <Check size={20} />
                                        </div>
                                    </RequestDialogConfirmComponent>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Aprovar Solicitação</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger>
                                    <RequestDialogConfirmComponent type='DENIED' id={id}>
                                        <div className='hover:bg-red-50 hover:text-red-500 p-2 rounded-sm'>
                                            <X size={20} />
                                        </div>
                                    </RequestDialogConfirmComponent>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Negar Solicitação</p>
                                </TooltipContent>
                            </Tooltip>

                        </>
                    )}
                </div>
            </div>

            <div>
                <h3 className=" text-gray-800 text-lg font-medium">
                    {truncatedText({ text: problems[0], max: 80 })}
                </h3>
                {problems.length > 1 && (
                    <RequestDialogComponent action='view'>
                        <span className='cursor-pointer text-blue-600 hover:bg-gray-50 hover:text-blue-700 text-sm'>
                            Ver todos os {problems.length} problemas.
                        </span>
                    </RequestDialogComponent>

                )}
            </div>

            <div className='flex items-center gap-4'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-1 text-gray-600'>
                        <User size={14} />
                        <span className='text-[0.8rem]'>{createdBy}</span>
                    </div>
                </div>
                <div className='flex items-center gap-1 text-gray-600'>
                    <Calendar size={14} />
                    <span className='text-[0.8rem]'>{dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                    <Tag size={15} />
                    <span className='text-[0.8rem] text-gray-600'>sistema, erro, instalação</span>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <MessageSquare size={15} />
                    <span className='text-sm text-gray-700 font-medium'> Solução Sugerida:</span>
                </div>
                <div className='border p-2 rounded-sm bg-gray-100 border-gray-300'>
                    <span className='text-[0.8rem] text-gray-900'>
                        {truncatedText({ text: solution })}
                    </span>
                </div>
            </div>
        </div >
    )
}