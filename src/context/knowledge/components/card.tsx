/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { truncatedText } from '@/helpers/truncate-text';
import dayjs from 'dayjs';
import { Bug, Calendar, Eye, SquarePen, Tag, Trash2, User } from 'lucide-react';
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
        <div className="flex flex-col justify-between h-80 gap-4 bg-white rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow p-4 border-2 hover:border-blue-300">
            <div>
                <h3 className=" text-gray-800 font-medium">{truncatedText({ text: knowledge.problems[0], max: 80 })}</h3>
            </div>
            <div>
                <span className='text-sm text-gray-600'>Problemas</span>
                {knowledge.problems.map((problem, index) => {
                    if (index <= 1) {
                        return <div key={index.toString()} className='flex items-center gap-1'>
                            <Bug size={12} />
                            <span className='text-[0.8rem] text-gray-500'>{truncatedText({ text: problem, max: 40 })}</span>
                        </div>
                    }

                    return null
                })}
            </div>
            <div>
                <span className='text-sm text-gray-600'>Solução</span>
                <div>
                    <span className='text-[0.8rem] text-gray-500'>{truncatedText({ text: knowledge.solution, max: 80 })}</span>
                </div>
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <Eye />
                    <span className='text-[0.8rem] text-gray-500'>40</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Button className='bg-sky-500 hover:bg-sky-400'><SquarePen />Editar</Button>
                    <Button variant="destructive"><Trash2 /></Button>
                </div>
            </div>
        </div>
    )
}