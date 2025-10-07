/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { RequestAnalysis } from "@/models/request-analysis";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Binoculars, Calendar, MessageSquare, Plus, Tag, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useConfirmAnalysis } from "../../http/use-confirm-analysis";

dayjs.locale('pt-br');


export interface RequestDialogContentProps {
    requestAnalysis: RequestAnalysis
    action: 'edit' | 'view'
    state: 'APPROVED' | 'DENIED' | 'DEFAULT'
    onRegisterHandlers?: (handlers: {
        update: () => void;
        confirm: () => void;
    }) => void;
    onModalState: 'APPROVED' | 'DENIED' | 'DEFAULT'
}

const createObservationSchema = z.object({
    observation: z.string().optional()
})

const updateAnalysisSchema = z.object({
    problems: z.array(z.string().min(6, "O problema deve conter no mínimo 6 caracteres.")),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
    tags: z.string().nullable(),
})

type UpdateAnalysisSchema = z.infer<typeof updateAnalysisSchema>
type CreateObservationSchema = z.infer<typeof createObservationSchema>

export function RequestDialogContent({ requestAnalysis, action, state, onRegisterHandlers, onModalState }: RequestDialogContentProps) {
    const { id, problems, solution, status, createdAt, createdBy, tags, observation } = requestAnalysis

    const { mutateAsync: confirmAnalysis } = useConfirmAnalysis(id)

    const updateForm = useForm<UpdateAnalysisSchema>({
        resolver: zodResolver(updateAnalysisSchema),
        defaultValues: {
            problems: problems,
            solution: solution,
            tags: tags,
        }
    })

    const confirmForm = useForm<CreateObservationSchema>({
        resolver: zodResolver(createObservationSchema),
        defaultValues: {
            observation: undefined,
        }
    })

    useEffect(() => {
        if (onRegisterHandlers) {
            onRegisterHandlers({
                update: updateForm.handleSubmit(handleUpdateAnalysisSubmit),
                confirm: confirmForm.handleSubmit(handleConfirmAnalysisSubmit)
            });
        }
    }, []);

    const [problemsUpdate, setProblemsUpdate] = useState<{ problem: string, isError: boolean }[]>(
        problems.map((item) => {
            return {
                problem: item,
                isError: false
            }
        })
    )

    function renumberProblems(problems: { problem: string, isError: boolean }[]) {
        return problems.map((p, _) => ({
            ...p,
        }));
    }

    function handleCreateNewProblem() {
        console.log('Clicou')
        const currentProblems = updateForm.getValues("problems")
        updateForm.setValue("problems", [...currentProblems, ""])

        const updated = [
            ...problemsUpdate,
            { problem: "", isError: false },
        ]
        const reordered = renumberProblems(updated)
        console.log(reordered)
        setProblemsUpdate(reordered)
    }

    function handleDeleteProblem(indexToRemove: number) {
        const currentProblems = updateForm.getValues("problems")
        if (currentProblems.length === 1) return

        const updatedFormProblems = currentProblems.filter((_, i) => i !== indexToRemove)
        updateForm.setValue("problems", updatedFormProblems)

        const updatedProblems = problemsUpdate.filter((_, i) => i !== indexToRemove)
        setProblemsUpdate(updatedProblems)
    }

    async function handleUpdateAnalysisSubmit(data: UpdateAnalysisSchema) {
        console.log(data)
        // await createKnowledge(data)

        updateForm.reset()
    }

    async function handleConfirmAnalysisSubmit(data: CreateObservationSchema) {
        await confirmAnalysis({
            status: 'APPROVED',
            observation: data.observation ?? undefined
        })

        confirmForm.reset()
    }

    return (
        <div className="flex flex-col gap-8 p-4">
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
                <div className="flex items-center justify-between">
                    <span className="text-[0.9rem] text-gray-900 font-semibold">Problemas:</span>
                    {action === 'edit' && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" className="bg-gray-100 hover:bg-gray-200 text-sky-500 cursor-pointer" onClick={handleCreateNewProblem}><Plus /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Adicionar novo problema.</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
                <ScrollArea className="w-full h-30 pr-4">
                    <div className="flex flex-col gap-2">
                        {problemsUpdate.map((_, index) => (
                            <div key={index.toString()} className="flex items-center gap-2 border p-2 rounded-lg">
                                <div className="h-8 w-8 rounded-full p-2 flex items-center justify-center border">
                                    <span>{index + 1}</span>
                                </div>
                                <Input
                                    placeholder="Descreva o problema..."
                                    className="bg-gray-100"
                                    disabled={action === 'view'}
                                    {...updateForm.register(`problems.${index}`)}
                                    onChange={(e) => {
                                        updateForm.setValue(`problems.${index}`, e.target.value);
                                        setProblemsUpdate(prev => {
                                            const copy = [...prev];
                                            copy[index].problem = e.target.value;
                                            copy[index].isError = e.target.value.length <= 6;
                                            return copy;
                                        });
                                        updateForm.trigger(`problems.${index}`);
                                    }}
                                />
                                {(action === 'edit' && index !== 0) && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Trash2 className="text-red-500 cursor-pointer" size={20} onClick={() => handleDeleteProblem(index)} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remover problema.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
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
                        className='border p-2 rounded-sm bg-blue-100 border-blue-500 
             break-all whitespace-pre-wrap overflow-x-hidden resize-y w-full'
                        disabled={action === 'view'}
                        {...updateForm.register('solution')}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <Tag size={15} />
                    <span className='text-[0.9rem] text-gray-900 font-semibold'> Tags:</span>
                </div>
                <div className="p-2 border rounded-lg">
                    <Input className="border-none outline-none" disabled={action === 'view'} {...updateForm.register('tags')} />
                </div>
            </div>
            {(observation && status !== 'PENDING') && (
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <Binoculars size={15} />
                        <span className='text-[0.9rem] text-gray-900 font-semibold'> Observações da Análise:</span>
                    </div>
                    <div>
                        <Input
                            className={`border p-2 rounded-sm ${status === 'APPROVED' ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500'}`}
                            disabled={true}
                            {...confirmForm.register('observation')}
                        />
                    </div>
                </div>
            )}

            {(state !== 'DEFAULT') && (
                <form onSubmit={confirmForm.handleSubmit(handleConfirmAnalysisSubmit)}>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <Binoculars size={15} />
                            <span className='text-[0.9rem] text-gray-900 font-semibold'> Informe sua observação: <span className="text-[0.8rem] text-gray-600">(Opcional)</span></span>
                        </div>
                        <div>
                            <Input
                                className={`border p-2 rounded-sm ${state === 'APPROVED' ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500'}`}
                                {...confirmForm.register('observation')}
                            />
                        </div>
                    </div>
                </form>
            )}
        </div >
    )
}