import { useQuery } from "@tanstack/react-query"

export interface FetchKnowledgeResponse {
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

export interface PaginationParams {
    page?: number
    totalPerPage?: number
    problem?: string
}

export function useFetchKnowledge({ page, problem, totalPerPage }: PaginationParams) {
    return useQuery({
        queryKey: ['knowledge', page, problem, totalPerPage],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;

            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (totalPerPage !== undefined) params.append('totalPerPage', totalPerPage.toString());
            if (problem) params.append('problem', problem);

            const res = await fetch(`${apiUrl}/api/v1/knowledges?${params.toString()}`);

            if (!res.ok) {
                throw new Error("Erro ao buscar conhecimentos");
            }

            const response: FetchKnowledgeResponse = await res.json();
            console.log(response);
            return response;
        },
    })
}