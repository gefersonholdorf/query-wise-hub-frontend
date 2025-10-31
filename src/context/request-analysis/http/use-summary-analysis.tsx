import { useQuery } from "@tanstack/react-query"

export interface SummaryAnalysisResponse {
    totalPendings: number
    totalApproveds: number
    totalDenieds: number
    total: number
    approvalRate: number
}

export function useSummaryAnalysis() {
    return useQuery({
        queryKey: ['summary-analysis'],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/analysis/summary`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            })

            if (!res.ok) {
                throw new Error("Erro ao buscar análises")
            }

            const response: SummaryAnalysisResponse = await res.json()

            return response
        }
    })
}