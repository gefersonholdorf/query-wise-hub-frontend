/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <"explanation"> */
/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Calendar, CircleCheck, CircleX, Clock, Edit, Eye, IdCardIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate()
    return (
        <div className="group flex gap-4 justify-between items-center bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.00] hover:shadow-lg shadow p-3 border-2 hover:border-blue-300">
            <div className='flex gap-4 items-center'>
                <div className={`flex items-center justify-center h-12 w-12 border ${status === 'APPROVED' && 'border-emerald-400 bg-emerald-50 text-emerald-600'} ${status === 'PENDING' && 'border-amber-400 bg-amber-50 text-amber-600'} ${status === 'DENIED' && 'border-red-400 bg-red-50 text-red-600'} rounded-lg`}>
                    {status === 'PENDING' && <Clock />}
                    {status === 'APPROVED' && <CircleCheck />}
                    {status === 'DENIED' && <CircleX />}
                </div>

                <div>
                    <div>
                        <h3 className=" text-gray-800 font-medium">
                            {truncatedText({ text: problems[0], max: 80 })}
                        </h3>
                    </div>

                    <div className='flex items-center gap-4'>
                        {status === 'PENDING' && <Badge className="bg-amber-100 text-amber-700 border border-amber-300">Pendente</Badge>}
                        {status === 'APPROVED' && <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">Aprovado</Badge>}
                        {status === 'DENIED' && <Badge className="bg-red-100 text-red-700 border border-red-300">Negado</Badge>}
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-1 text-gray-600'>
                                <IdCardIcon size={14} />
                                <span className='text-[0.8rem]'>{id}</span>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-1 text-gray-600'>
                                <User size={14} />
                                <span className='text-[0.8rem]'>{createdBy}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 text-gray-600'>
                            <Calendar size={14} />
                            <span className='text-[0.8rem]'>{dayjs(createdAt).format('DD/MM/YYYY HH:MM')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {status === 'PENDING' && <Button className='bg-sky-500 hover:bg-sky-600' onClick={() => navigate(`/analysis/${id}`)}><Edit />Revisar Análise</Button>}
            {status !== 'PENDING' && <Button variant="outline" onClick={() => navigate(`/analysis/${id}`)}><Eye />Revisar Análise</Button>}
        </div >
    )
}