import { useQuery } from "@tanstack/react-query";

export interface StatusDatabaseResponse {
    mysql: boolean
    qdrant: boolean
}

export interface StatusApplicationResponse {
    status: boolean
}

export async function statusDatabase() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/v1/health-db`)

    if (!res.ok) {
        throw new Error("Erro ao buscar status")
    }

    const response: StatusDatabaseResponse = await res.json()

    return response
}

export async function statusApplication() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/v1/health`)

    if (!res.ok) {
        throw new Error("Erro ao buscar status")
    }

    const response: StatusApplicationResponse = await res.json()

    return response
}

export function useStatusDatabases() {
    return useQuery({
        queryKey: ['status-database'],
        queryFn: statusDatabase,
        refetchInterval: 10000, // 10 segundos
        staleTime: 0,
        gcTime: 0
    })
}

export function useStatusApplication() {
    return useQuery({
        queryKey: ['status-application'],
        queryFn: statusApplication,
        refetchInterval: 10000, // 10 segundos
        staleTime: 0,
        gcTime: 0
    })
}