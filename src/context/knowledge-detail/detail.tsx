/** biome-ignore-all assist/source/organizeImports: <!> */
import { Button } from "@/components/ui/button";
import { SaveAll, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import z from "zod/v4"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useCreateKnowledge } from "@/context/create-knowledge/http/use-create-knowledge";
import type { Knowledge } from "@/models/knowledge";

export const createKnowledgeSchema = z.object({
    problem: z.string().min(6, "O problema deve conter no mínimo 6 caracteres."),
    solution: z.string().min(6, "A solução deve conter no mínimo 6 caracteres."),
    status: z.boolean()
})

export type CreateKnowledgeSchema = z.infer<typeof createKnowledgeSchema>

export interface KnowledgeDetailProps {
    isAction: 'edit' | 'create'
    knowledge: Knowledge | null
}

export function Detail({ isAction, knowledge }: KnowledgeDetailProps) {
    const form = useForm<CreateKnowledgeSchema>({
        resolver: zodResolver(createKnowledgeSchema),
        defaultValues: {
            problem: isAction === 'edit' && knowledge ? knowledge.payload.problem : '',
            solution: isAction === 'edit' && knowledge ? knowledge.payload.solution : '',
            status: isAction === 'edit' && knowledge ? knowledge.payload.status : true,
        }
    })

    const navigate = useNavigate();

    const { mutateAsync: createKnowledge, isPending } = useCreateKnowledge()

    async function handleCreateKnowledgeSubmit(data: CreateKnowledgeSchema) {
        await createKnowledge(data)

        form.reset()

        navigate('/knowledge')
    }

    return (
        <form onSubmit={form.handleSubmit(handleCreateKnowledgeSubmit)} className="flex flex-col gap-6">
            <div className="">
                <h3 className="text-gray-800 font-medium">Informações do Conhecimento</h3>
            </div>

            <div>
                <span className="text-sm text-gray-800">Problema ou Questão <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="Descreva o problema ou questão que este conhecimento resolve..."
                    {...form.register('problem')}
                />
                <span className="text-sm text-red-500">
                    {form.formState.errors.problem?.message}
                </span>
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
                    {...form.register('solution')}
                />
                <span className="text-sm text-red-500">
                    {form.formState.errors.solution?.message}
                </span>
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