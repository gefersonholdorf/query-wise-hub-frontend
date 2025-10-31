/** biome-ignore-all lint/suspicious/noRedeclare: <"explanation"> */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export interface UpdateAnalysisRequest {
    problems: string[]
    solution: string
}

export function useUpdateAnalysisById(id: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-analysis', id],
        mutationFn: async (data: UpdateAnalysisRequest) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/analysis/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify(data)
            })

            if (res.status !== 204) {
                throw new Error("Erro ao atualizar análise")
            }
        },
        onError: () => {
            toast.error("Erro ao atualizar a análise.", {
                position: 'top-center'
            })
        },
        onSuccess: async () => {
            toast.success("Sucesso ao atualizar análise.", {
                position: 'top-center'
            })

            await queryClient.invalidateQueries({
                queryKey: ["analysis"],
                exact: false,
            })

            await queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            })

            await queryClient.invalidateQueries({
                queryKey: ["analysis-detail", id],
            })
        }
    })
}