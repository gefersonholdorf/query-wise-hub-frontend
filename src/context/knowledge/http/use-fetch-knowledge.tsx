import { useInfiniteQuery } from "@tanstack/react-query"

export interface FetchKnowledgeResponse {
    data:
    {
        "id": string,
        "payload": {
            "problem": string,
            "solution": string,
            "createdAt": string
        }
    }[]
    "nextCursor": string | null,
    "hasMore": boolean
}

export function useFetchKnowledge() {
    return useInfiniteQuery({
        queryKey: ['knowledge'],
        queryFn: async ({ pageParam }) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/knowledges?cursor=${pageParam}&limit=1`)

            if (!res.ok) {
                throw new Error("Erro ao buscar knowledges")
            }

            const response: FetchKnowledgeResponse = await res.json()

            return response
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        initialPageParam: '',
    })
}