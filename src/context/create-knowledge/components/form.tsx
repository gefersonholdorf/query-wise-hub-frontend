/** biome-ignore-all assist/source/organizeImports: <!> */
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, NotepadText, Plus, SaveAll, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod/v4";
import { useCreateKnowledge } from "../http/use-create-knowledge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator";

export interface Problem {
    id: string
    title: string
    problem: string
    isError: boolean
}

export const createKnowledgeSchema = z.object({
    problems: z.array(z.string().min(6, "O problema deve conter no mínimo 6 caracteres.")),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
    status: z.boolean()
})

export type CreateKnowledgeSchema = z.infer<typeof createKnowledgeSchema>

export function Form() {
    const form = useForm<CreateKnowledgeSchema>({
        resolver: zodResolver(createKnowledgeSchema),
        defaultValues: {
            problems: [''],
            solution: '',
            status: true,
        }
    })

    const [problems, setProblems] = useState<Problem[]>([
        {
            id: crypto.randomUUID(),
            title: 'Problema 1',
            problem: '',
            isError: false
        }
    ])

    const [activeTab, setActiveTab] = useState(problems[0].title)

    const navigate = useNavigate();

    const { mutateAsync: createKnowledge, isPending } = useCreateKnowledge()

    function renumberProblems(problems: Problem[]) {
        return problems.map((p, index) => ({
            ...p,
            title: `Problema ${index + 1}`,
        }));
    }

    function handleCreateNewProblem() {
        const currentProblems = form.getValues("problems")
        form.setValue("problems", [...currentProblems, ""])

        const updated = [
            ...problems,
            { id: crypto.randomUUID(), title: "", problem: "", isError: false },
        ]
        const reordered = renumberProblems(updated)
        setProblems(reordered)

        setActiveTab(reordered[reordered.length - 1].title)
    }

    function handleDeleteProblem(id: string) {
        if (problems.length === 1) return

        const indexToRemove = problems.findIndex((p) => p.id === id)
        const updated = problems.filter((p) => p.id !== id)

        const currentProblems = form.getValues("problems")
        const updatedFormProblems = currentProblems.filter((_, i) => i !== indexToRemove)
        form.setValue("problems", updatedFormProblems)

        const reordered = renumberProblems(updated)
        setProblems(reordered)

        if (activeTab === problems[indexToRemove].title) {
            setActiveTab(reordered[0].title)
        }
    }

    async function handleCreateKnowledgeSubmit(data: CreateKnowledgeSchema) {
        // await createKnowledge(data)

        form.reset()

        console.log(data)

        navigate('/knowledge')
    }

    return (
        <form onSubmit={form.handleSubmit(handleCreateKnowledgeSubmit)} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <NotepadText />
                <h3 className="text-gray-800 font-medium">Informações do Conhecimento</h3>
            </div>
            <Separator />
            <div>
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <span className="text-sm text-gray-800">Problema ou Questão <span className="text-red-500">*</span></span>
                    <Button
                        className="bg-blue-500 hover:bg-blue-400"
                        type="button"
                        onClick={() => handleCreateNewProblem()}
                    >
                        <Plus />
                        Adicionar problema
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white">
                    <ScrollArea className="w-50 lg:w-280 rounded-md whitespace-nowrap p-2">
                        <TabsList className="flex items-center gap-4 bg-white">
                            {problems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-2 border rounded-lg px-2 ${activeTab === item.title
                                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                                        : 'border text-gray-800'
                                        }`}
                                >
                                    {item.problem.length <= 6 && (

                                        <Tooltip>
                                            <TooltipTrigger>
                                                <AlertCircle size={15} className="text-amber-500 cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>O problema deve ter no mínimo 6 caracteres.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    <TabsTrigger value={item.title} className="shadow-none border-none">
                                        {item.title}
                                    </TabsTrigger>
                                    {item.title !== 'Problema 1' && (
                                        <Trash2
                                            size={15}
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDeleteProblem(item.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    {problems.map((item, index) => {
                        return (
                            <TabsContent key={item.id} value={item.title}>
                                <Textarea
                                    placeholder="Descreva o problema..."
                                    {...form.register(`problems.${index}`)}
                                    onChange={(e) => {
                                        form.setValue(`problems.${index}`, e.target.value);
                                        setProblems(prev => {
                                            const copy = [...prev];
                                            copy[index].problem = e.target.value;
                                            copy[index].isError = e.target.value.length <= 6;
                                            return copy;
                                        });
                                    }}
                                />
                                <span className="text-sm text-red-500">
                                    {form.formState.errors.problems?.[index]?.message}
                                </span>
                            </TabsContent>
                        )
                    })}
                </Tabs>

            </div>

            <div>
                <Alert variant="default" className="bg-amber-50 text-amber-500 border border-amber-500">
                    <AlertCircle />
                    <AlertTitle>
                        Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.
                    </AlertTitle>
                </Alert>
            </div>

            <div>
                <span className="text-sm text-gray-800">Solução ou resposta <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="Descreva a solução detalhada para o problema..."
                    {...form.register('solution')}
                />
                <span className="text-sm text-red-500">
                    {form.formState.errors.solution?.message}
                </span>
            </div>

            <div>
                <span className="text-sm text-gray-800">Tags <span className="text-gray-600 text-[0.8rem]">(separadas por vírgula)</span></span>
                <Input
                    placeholder="ex: sistema, erro, configuração, instação"
                // {...form.register('solution')}
                />
                {/* <span className="text-sm text-red-500">
                    {form.formState.errors.solution?.message}
                </span> */}
            </div>

            <div>
                <span className="text-sm text-gray-800">Status</span>
                <Select onValueChange={(value) => form.setValue('status', value === 'true')}
                    value={form.watch('status') ? 'true' : 'false'}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">Ativo</SelectItem>
                        <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-4 items-center justify-end">
                <Button variant="destructive" type="button" onClick={() => navigate('/knowledge')} className="w-40 p-2">
                    <X />
                    Cancelar
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-400 w-40 p-2" type="submit" disabled={isPending}>
                    <SaveAll />
                    Salvar
                </Button>
            </div>
        </form>
    )
}