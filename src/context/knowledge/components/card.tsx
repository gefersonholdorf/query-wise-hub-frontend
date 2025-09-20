/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Badge } from '@/components/ui/badge';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Calendar, Tag, User } from 'lucide-react';
import { useNavigate } from 'react-router';

dayjs.locale('pt-br');

export interface CardProps {
    id: string
    problem: string
    soluction: string
    createdBy: string
    updatedAt: Date
    createdAt: Date
    status: boolean
}

export function Card({ id, problem, soluction, createdBy, updatedAt, createdAt, status }: CardProps) {
    const navigate = useNavigate()

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: <"explanation">
        <div onClick={() => navigate(`/knowledge/${id}`)} className="flex flex-col gap-4 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow p-4 cursor-pointer border-2 hover:border-blue-300">
            <div>
                <h3 className=" text-gray-800 font-medium">{truncatedText({ text: problem, max: 120 })}</h3>
            </div>
            <div className='flex items-center gap-2'>
                {status ? (
                    <Badge className='bg-emerald-500 text-white'>Ativo</Badge>
                ) : (
                    <Badge className='bg-red-500 text-white'>Inativo</Badge>
                )}
                <div className='flex items-center gap-1'>
                    <Tag size={15} />
                    <span className='text-[0.8rem] text-gray-600'>sistema, erro, instalação</span>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-sm text-gray-700 font-medium'>Solução:</span>
                <span className='text-[0.8rem] text-gray-600'>{truncatedText({ text: soluction })}</span>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2 text-gray-600'>
                        <Calendar size={14} />
                        <span className='text-[0.8rem]'>Criado: {dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600'>
                        <Calendar size={14} />
                        <span className='text-[0.8rem]'>Atualizado: {dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-gray-600'>
                    <User size={14} />
                    <span className='text-[0.8rem]'>Criado por: {createdBy}</span>
                </div>
            </div>
        </div>
    )
}