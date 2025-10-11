import { useQuery } from "@tanstack/react-query"

export interface FetchGetAnalysisByIdResponse {
    id: number,
    problems: string[]
    solution: string
    createdAt: Date
    createdBy: string
    tags: string | null
    status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export function useGetAnalysisById(id: number) {
    return useQuery({
        queryKey: ['analysis-detail', id],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/analysis/${id}`)

            if (!res.ok) {
                throw new Error("Erro ao buscar análises")
            }

            const response: FetchGetAnalysisByIdResponse = await res.json()

            console.log(response)

            return response
        },
    })
}