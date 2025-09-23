/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Binoculars, Calendar, MessageSquare, Tag, User } from "lucide-react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { RequestAnalysis } from "@/models/request-analysis";
import { z } from "zod/v4";

dayjs.locale('pt-br');


export interface RequestDialogContentProps {
    requestAnalysis: RequestAnalysis
    action: 'edit' | 'view'
    state: 'APPROVED' | 'DENIED' | 'DEFAULT'
}

const createObservationSchema = z.object({
    observation: z.string().optional()
})

type CreateObservationSchema = z.infer<typeof createObservationSchema>

export function RequestDialogContent({ requestAnalysis, action, state }: RequestDialogContentProps) {
    const { problems, solution, status, createdAt, createdBy, tags, observation } = requestAnalysis

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="p-3 rounded-lg border border-gray-600 bg-gray-50">
                <div className='grid grid-cols-2 items-center'>
                    <div className='flex items-center gap-1 text-gray-800'>
                        <User size={14} />
                        <span className='text-sm'>Solicitante: {createdBy}</span>
                    </div>
                    <div className='flex items-center gap-1 text-gray-800'>
                        <Calendar size={14} />
                        <span className='text-sm'>Data: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-[0.9rem] text-gray-900 font-semibold">Problemas:</span>
                <ScrollArea className="w-full h-30 pr-4">
                    <div className="flex flex-col gap-2">
                        {problems.map((problem, index) => (
                            <div key={index.toString()} className="flex items-center gap-2 border p-2 rounded-lg">
                                <div className="h-8 w-8 rounded-full p-2 flex items-center justify-center border">
                                    <span>{index + 1}</span>
                                </div>
                                <Input className="border-none outline-none" disabled={action === 'view'} value={problem} />
                            </div>
                        ))
                        }
                    </div>
                </ScrollArea>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <MessageSquare size={15} />
                    <span className='text-[0.9rem] text-gray-900 font-semibold'> Solução Sugerida:</span>
                </div>
                <div>
                    <Textarea
                        className='border p-2 rounded-sm bg-blue-100 border-blue-500'
                        value={solution}
                        disabled={action === 'view'}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <Tag size={15} />
                    <span className='text-[0.9rem] text-gray-900 font-semibold'> Tags:</span>
                </div>
                <div className="p-2 border rounded-lg">
                    <Input className="border-none outline-none" disabled={action === 'view'} value={tags} />
                </div>
            </div>
            {(observation && status !== 'PENDING') && (
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <Binoculars size={15} />
                        <span className='text-[0.9rem] text-gray-900 font-semibold'> Observações da Análise:</span>
                    </div>
                    <div>
                        <Textarea
                            className={`border p-2 rounded-sm ${status === 'APPROVED' ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500'}`}
                            value={observation}
                            disabled={true}
                        />
                    </div>
                </div>
            )}

            {(state !== 'DEFAULT') && (
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <Binoculars size={15} />
                        <span className='text-[0.9rem] text-gray-900 font-semibold'> Informe sua observação: <span className="text-[0.8rem] text-gray-600">(Opcional)</span></span>
                    </div>
                    <div>
                        <Textarea
                            className={`border p-2 rounded-sm ${state === 'APPROVED' ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500'}`}
                        />
                    </div>
                </div>
            )}
        </div >
    )
}