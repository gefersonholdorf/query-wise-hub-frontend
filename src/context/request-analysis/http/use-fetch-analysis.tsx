import { useQuery } from "@tanstack/react-query"

export interface FetchAnalysisResponse {
    data: {
        id: number,
        problems: string[]
        solution: string
        createdAt: Date
        createdBy: string
        tags: string | null
        status: 'PENDING' | 'APPROVED' | 'DENIED'
    }[]
    total: number
    page: number
    totalPerPage: number
}

export function useFetchAnalysis(page: number, status: 'PENDING' | 'APPROVED' | 'DENIED') {
    return useQuery({
        queryKey: ['analysis', page, status],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/analysis?page=${page}&&totalPerPage=5&&status=${status}`)

            if (!res.ok) {
                throw new Error("Erro ao buscar análises")
            }

            const response: FetchAnalysisResponse = await res.json()

            return response
        },
    })
}