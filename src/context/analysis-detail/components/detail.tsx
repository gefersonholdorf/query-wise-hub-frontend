/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleAlert, CircleCheck, CircleX, Clock, Plus, Trash2 } from "lucide-react";
import type { AnalysisDetail } from "./main";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const updateAnalysisSchema = z.object({
    problems: z.array(z.string().min(6, "O problema deve conter no mínimo 6 caracteres.")),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
})

type UpdateAnalysisSchema = z.infer<typeof updateAnalysisSchema>

interface DetailComponentProps {
    analysis: AnalysisDetail
}

export function DetailComponent({ analysis }: DetailComponentProps) {
    const updateForm = useForm<UpdateAnalysisSchema>({
        resolver: zodResolver(updateAnalysisSchema),
        defaultValues: {
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

    return (
        <Card className="p-4 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardTitle className="flex gap-2 items-center">Detalhes da Revisão {analysis.id}
                {analysis.status === 'PENDING' && <Badge className="bg-amber-100 text-amber-700 border border-amber-300"><Clock />PENDENTE</Badge>}
                {analysis.status === 'APPROVED' && <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300"><CircleCheck />APROVADO</Badge>}
                {analysis.status === 'DENIED' && <Badge className="bg-red-100 text-red-700 border border-red-300"><CircleX />NEGADO</Badge>}
            </CardTitle>
            <CardContent className="p-0 space-y-4">

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleAlert className="text-sky-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.</p>
                                </TooltipContent>
                            </Tooltip>

                            <span className="text-sm text-gray-800">Problemas<span className="text-red-500">*</span></span>
                        </div>
                        {analysis.status === 'PENDING' && (
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
                    <ScrollArea className="w-full h-60 pr-4">
                        <div className="flex flex-col gap-2">
                            {problemsUpdate.map((_, index) => (
                                <div key={index.toString()} className="flex items-center gap-2 border p-2 rounded-lg">
                                    <div className="h-8 w-8 rounded-full p-2 flex items-center justify-center border">
                                        <span>{index + 1}</span>
                                    </div>
                                    <Input
                                        placeholder="Descreva o problema..."
                                        className="bg-gray-100"
                                        disabled={analysis.status === 'APPROVED' || analysis.status === 'DENIED'}
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
                                    {(analysis.status === 'PENDING' && index !== 0) && (
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
                        className="bg-gray-50"
                        placeholder="Descreva a solução detalhada para o problema..."
                        disabled={analysis.status === 'APPROVED' || analysis.status === 'DENIED'}
                        {...updateForm.register("solution")}
                    />
                </div>

            </CardContent>
        </Card >
    )
}