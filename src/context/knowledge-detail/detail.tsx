/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { truncatedText } from "@/helpers/truncate-text"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert, Edit2, Eye, Plus, Share2, SquarePen, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod/v4"
import type { AnalysisDetail } from "../analysis-detail/components/main"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { ViewDetail } from "./view-detail"

const updateKnowledgesSchema = z.object({
    title: z.string().min(6, "O título deve conter no mínimo 6 caracteres."),
    problems: z.array(z.string().min(6, "O problema deve conter no mínimo 6 caracteres.")),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
})

type UpdateKnowledgesSchema = z.infer<typeof updateKnowledgesSchema>

export interface KnowledgeDetailProps {
    analysis: AnalysisDetail
    isAction: 'edit' | 'view'
    onSetState: (state: 'edit' | 'view') => void
}

export function Detail({ isAction, onSetState, analysis }: KnowledgeDetailProps) {
    const updateForm = useForm<UpdateKnowledgesSchema>({
        resolver: zodResolver(updateKnowledgesSchema),
        defaultValues: {
            title: '',
            problems: analysis.problems,
            solution: analysis.solution
        }
    })

    const [problemsUpdate, setProblemsUpdate] = useState<{ problem: string, isError: boolean }[]>(
        analysis.problems.map((item) => {
            return {
                problem: item,
                isError: false
            }
        }) ?? []
    )

    function renumberProblems(problems: { problem: string, isError: boolean }[]) {
        return problems.map((p, _) => ({
            ...p,
        }));
    }

    function handleCreateNewProblem() {
        const currentProblems = updateForm.getValues("problems")
        updateForm.setValue("problems", [...currentProblems, ""])

        const updated = [
            ...problemsUpdate,
            { problem: "", isError: false },
        ]
        const reordered = renumberProblems(updated)
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

    async function handleOnSubmitUpdate(data: UpdateKnowledgesSchema) {
        console.log(data)
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={updateForm.handleSubmit(handleOnSubmitUpdate)}>
            <div className="flex items-center justify-between gap-8">
                {isAction === 'view' && (
                    <div className="flex flex-col w-full bg-sky-50 rounded-lg p-2 border-l-3 border-sky-600">
                        <span className="text-sm text-sky-700 font-semibold">Modo de Visualização</span>
                        <span className="text-sm text-sky-800">Você está atualmente visualizando este conhecimento. Para fazer alterações, entre no modo de edição.</span>
                    </div>
                )}
                {isAction === 'edit' && (
                    <div className="flex flex-col w-full bg-amber-50 rounded-lg p-2 border-l-3 border-amber-600">
                        <span className="text-sm text-amber-700 font-semibold">Modo de Edição</span>
                        <span className="text-sm text-amber-800">Você está atualmente editando este conhecimento. Para apenas visualizar, entre no modo de visualização.</span>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <div className="p-2 hover:bg-gray-50 rounded-sm flex items-center justify-center cursor-pointer">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Share2 size={20} className="text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Compartilhar conhecimento.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="p-2 hover:bg-gray-50 rounded-sm flex items-center justify-center cursor-pointer">
                        {isAction === 'view' && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <SquarePen onClick={() => onSetState('edit')} size={20} className="text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Editar conhecimento.</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        {isAction === 'edit' && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Eye onClick={() => onSetState('view')} size={20} className="text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualizar conhecimento.</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <div className="p-2 hover:bg-gray-50 rounded-sm flex items-center justify-center cursor-pointer">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Trash2 size={20} className="text-red-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Excluir conhecimento.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {isAction === 'edit' && (
                <div className="w-full">
                    <div>
                        <span className="text-sm text-gray-800">Título<span className="text-red-500"> *</span></span>
                    </div>
                    <Input placeholder="Digite o título do conhecimento..." className="bg-gray-50 text-gray-600" />
                </div>
            )}
            {isAction === 'view' && <span className="flex text-2xl text-gray-800 font-bold text-shadow-2xs">{truncatedText({ text: "Deploy em produção requer upload manual de artefatos e execução de scripts de configuração", max: 100 })}</span>}
            {isAction === 'edit' && (
                <div className="grid grid-cols-2 gap-4 border p-2 rounded-2xl border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1 items-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CircleAlert className="text-sky-500" size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Informe todos os problemas do mesmo contexto que a solução abaixo irá solucionar.</p>
                                    </TooltipContent>
                                </Tooltip>

                                <span className="text-sm text-gray-800">Problemas<span className="text-red-500"> *</span></span>
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button type="button" className="bg-gray-100 hover:bg-gray-200 text-sky-500 cursor-pointer" onClick={handleCreateNewProblem}><Plus /></Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar novo problema.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <ScrollArea className="w-full h-60 pr-4">
                            <div className="flex flex-col gap-2">
                                {problemsUpdate.map((_, index) => (
                                    <div key={index.valueOf()} className="flex items-center gap-2 border p-2 rounded-lg">
                                        <div className="h-8 w-8 rounded-full p-2 flex items-center justify-center border">
                                            <span>{index + 1}</span>
                                        </div>
                                        <Input
                                            placeholder="Descreva o problema..."
                                            className="bg-gray-100 text-gray-700"
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
                                        {(index !== 0) && (
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
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CircleAlert className="text-sky-500" size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.</p>
                                    </TooltipContent>
                                </Tooltip>

                                <span className="text-sm text-gray-800">Solução ou resposta <span className="text-red-500">*</span></span>
                            </div>
                            <Textarea
                                className="bg-gray-50 min-h-30 text-gray-600"
                                placeholder="Descreva a solução detalhada para o problema..."
                                {...updateForm.register("solution")}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-full">
                                <div className="flex gap-1 items-center">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CircleAlert className="text-sky-500" size={15} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <span className="text-sm text-gray-800">Tags <span className="text-red-500">*</span></span>
                                </div>
                                <Input
                                    className="bg-gray-50 text-gray-600"
                                    placeholder="Descreva a solução detalhada para o problema..."
                                    {...updateForm.register("solution")}
                                />
                            </div>
                            <div className="w-full">
                                <div className="flex gap-1 items-center">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CircleAlert className="text-sky-500" size={15} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <span className="text-sm text-gray-800">Tags <span className="text-red-500">*</span></span>
                                </div>
                                <Input
                                    className="bg-gray-50 text-gray-600"
                                    placeholder="Descreva a solução detalhada para o problema..."
                                    {...updateForm.register("solution")}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Button onClick={() => onSetState("view")} variant="destructive"><X />Cancelar</Button>
                            <Button className="bg-sky-500 hover:bg-sky-600"><Edit2 />Salvar Alterações</Button>
                        </div>
                    </div>
                </div>
            )}
            {isAction === 'view' && <ViewDetail />}
        </form>
    )
}