/** biome-ignore-all lint/suspicious/noRedeclare: <"explanation"> */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate, useLocation } from 'react-router-dom';

export interface ConfirmAnalysisRequest {
    status: 'APPROVED' | 'DENIED'
    observation: string
}

export function useConfirmAnalysis(id: number) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['confirm-analysis', id],
        mutationFn: async (data: ConfirmAnalysisRequest) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/analysis/confirm/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify(data)
            })

            if (res.status !== 204) {
                throw new Error("Erro ao confirmar análise")
            }
        },
        onError: () => {
            toast.error("Erro ao confirmar a análise.", {
                position: 'top-center'
            })
        },
        onSuccess: () => {
            toast.success("Sucesso ao confirmar análise.", {
                position: 'top-center'
            })

            queryClient.invalidateQueries({
                queryKey: ["analysis"],
                exact: false,
            })

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            })

            navigate(location.pathname, { replace: true });
        }
    })
}