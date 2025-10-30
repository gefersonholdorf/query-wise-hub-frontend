import { keepPreviousData, useQuery } from "@tanstack/react-query"

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
    pageSize: number
    totalPages: number
    totalPerPage: number
}

export function useFetchAnalysis(page: number, status: 'PENDING' | 'APPROVED' | 'DENIED' | undefined, totalPerPage: number) {
    return useQuery({
        queryKey: ['analysis', page, status],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;

            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (status !== undefined) params.append('status', status.toString());
            if (totalPerPage !== undefined) params.append('totalPerPage', totalPerPage.toString());

            const res = await fetch(`${apiUrl}/api/v1/analysis?${params.toString()}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            })

            if (!res.ok) {
                throw new Error("Erro ao buscar análises")
            }

            const response: FetchAnalysisResponse = await res.json()

            return response
        },
        placeholderData: keepPreviousData
    })
}