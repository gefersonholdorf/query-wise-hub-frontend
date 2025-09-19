import { Badge } from '@/components/ui/badge';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs'
import { Calendar, User } from 'lucide-react';

dayjs.locale('pt-br');

export interface CardProps {
    problem: string
    soluction: string
    createdBy: string
    updatedAt: Date
    createdAt: Date
    status: boolean
}

export function Card({ problem, soluction, createdBy, updatedAt, createdAt, status }: CardProps) {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.00] hover:shadow-lg shadow p-4 cursor-pointer border hover:border-blue-100">
            <div>
                <h3 className=" text-gray-800 font-medium">{truncatedText({ text: problem, max: 120 })}</h3>
            </div>
            <div>
                {status ? (
                    <Badge className='bg-emerald-500 text-white'>Ativo</Badge>
                ) : (
                    <Badge className='bg-red-500 text-white'>Inativo</Badge>
                )}
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