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
import { AlertCircle, Bot, BotIcon, CircleAlert, Dna, NotepadText, Plus, SaveAll, Trash2, X } from "lucide-react";
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
import { Loader2 } from "lucide-react";
import { useGenerateProblems } from "../http/use-generate-problems";
import { toast } from "sonner";

export interface Problem {
    id: string
    title: string
    problem: string
    isError: boolean
}

export const createKnowledgeSchema = z.object({
    problems: z.array(z.string().min(6, "O problema deve conter no mínimo 6 caracteres.")),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
    tags: z.string().nullable(),
    isActive: z.boolean()
})

export type CreateKnowledgeSchema = z.infer<typeof createKnowledgeSchema>

export function Form() {
    const form = useForm<CreateKnowledgeSchema>({
        resolver: zodResolver(createKnowledgeSchema),
        defaultValues: {
            problems: [''],
            solution: '',
            tags: null,
            isActive: true,
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

    const { refetch, isFetching } = useGenerateProblems(problems[0].problem);

    const [generateProblems, setGenerateProblems] = useState(false)

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

    async function handleGenerateProblems(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!problems[0].problem) {
            toast.error("Para gerar problemas, o Problema 1 deverá ser preenchido!", {
                position: 'top-center'
            })
            return
        }
        try {
            const { data: response } = await refetch();

            if (!response) {
                return
            }

            const newProblems = response.split(',').map(p => p.trim());

            const startingIndex = problems.length;

            const problemsFormated: Problem[] = newProblems.map((item, i) => ({
                id: crypto.randomUUID(),
                problem: item,
                isError: item.length <= 6,
                title: `Problema ${startingIndex + i + 1}`
            }));

            setProblems(prev => [...prev, ...problemsFormated]);

            const currentFormProblems = form.getValues('problems');
            form.setValue('problems', [...currentFormProblems, ...problemsFormated.map(p => p.problem)]);
            setGenerateProblems(true)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleCreateKnowledgeSubmit(data: CreateKnowledgeSchema) {
        await createKnowledge(data)

        form.reset()

        navigate('/knowledge')
    }

    return (
        <form onSubmit={form.handleSubmit(handleCreateKnowledgeSubmit)} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <NotepadText className="text-gray-600" size={20} />
                <h3 className="text-gray-800 font-medium">Informações do Conhecimento</h3>
            </div>
            <Separator />
            <div className="border p-4 rounded-lg">
                <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
                    <div className="flex items-center gap-1">
                        <Tooltip>
                            <TooltipTrigger>
                                <CircleAlert className="text-amber-500" size={15} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>É possível cadastrar problemas com IA a partir de um problema principal ou de forma manual.</p>
                            </TooltipContent>
                        </Tooltip>
                        <span className="text-sm text-gray-800">Problemas ou Questões <span className="text-red-500">*</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    className="bg-sky-500 hover:bg-sky-400"
                                    type="button"
                                    onClick={handleGenerateProblems}
                                    disabled={isFetching || generateProblems}
                                >
                                    {isFetching ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <BotIcon className="h-5 w-5" />
                                    )}
                                    {isFetching ? "Gerando Problemas..." : "Gerar Problemas"}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>A IA irá cadastrar problemas com base no mesmo contexto do Problema 1.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    className="bg-violet-500 hover:bg-violet-400"
                                    type="button"
                                    onClick={() => handleCreateNewProblem()}
                                >
                                    <Plus />
                                    Adicionar problema
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cadastrar um novo problema de forma manual.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
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
                                                <AlertCircle size={15} className="text-red-500 cursor-pointer" />
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
                                    className="bg-gray-100"
                                    {...form.register(`problems.${index}`)}
                                    onChange={(e) => {
                                        form.setValue(`problems.${index}`, e.target.value);
                                        setProblems(prev => {
                                            const copy = [...prev];
                                            copy[index].problem = e.target.value;
                                            copy[index].isError = e.target.value.length <= 6;
                                            return copy;
                                        });
                                        form.trigger(`problems.${index}`);
                                    }}
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>

            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <CircleAlert className="text-amber-500" size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Todos os problemas acima compartilharão a mesma solução. Para soluções diferentes, crie um novo conhecimento.</p>
                        </TooltipContent>
                    </Tooltip>

                    <span className="text-sm text-gray-800">Solução ou resposta <span className="text-red-500">*</span></span>
                </div>
                <Textarea
                    className="bg-gray-100"
                    placeholder="Descreva a solução detalhada para o problema..."
                    {...form.register('solution')}
                />
                {form.formState.errors.solution && (
                    <span className="text-[0.8rem] text-red-500 border border-red-300 bg-red-50 rounded-sm p-1 pl-2">
                        {form.formState.errors.solution?.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-800">Tags <span className="text-gray-600 text-[0.8rem]">(separadas por vírgula)</span></span>
                <Input
                    className="bg-gray-100"
                    placeholder="ex: sistema, erro, configuração, instação"
                    {...form.register('tags')}
                />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-800">Status</span>
                <Select onValueChange={(value) => form.setValue('isActive', value === 'true')}
                    value={form.watch('isActive') ? 'true' : 'false'}>
                    <SelectTrigger className="w-[180px] bg-gray-100">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100">
                        <SelectItem value="true">Ativo</SelectItem>
                        <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="flex gap-4 items-center justify-end">
                <Button variant="destructive" type="button" onClick={() => navigate('/knowledge')} className="w-40 p-2">
                    <X />
                    Cancelar
                </Button>

                <Button
                    className="bg-blue-500 hover:bg-blue-400 w-40 p-2 flex items-center justify-center gap-2"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <SaveAll className="h-5 w-5" />
                    )}
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}