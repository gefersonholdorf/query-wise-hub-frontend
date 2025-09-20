import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateKnowledgeRequest {
    problem: string
    solution: string
    status: boolean
}

export interface CreateKnowledgeResponse {
    knowledgeId: string
}

export function useCreateKnowledge() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-knowledge'],
        mutationFn: async (data: CreateKnowledgeRequest) => {
            const apiUrl = import.meta.env.VITE_API_URL;

            const res = await fetch(`${apiUrl}/api/v1/knowledges`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                throw new Error("Erro ao buscar knowledges")
            }

            const response: CreateKnowledgeResponse = await res.json()

            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["knowledge"] })

            toast.success("Conhecimento criado com sucesso!", {
                position: 'top-center'
            })
        },
        onError: () => {
            toast.error("Erro ao criar conhecimento!", {
                position: 'top-center'
            })
        }
    })
}