import { useQuery } from "@tanstack/react-query";

export interface SummaryDashboardResponse {
    totalKnowledges: number;
    totalViews: number;
    totalAnalysis: number;
    totalUsers: number;
    totalPendings: number;
    totalApproveds: number;
    totalDenieds: number;
    approvalRate: number;
    knowledgesUsed: number;
    effectiveKnowledges: number;
    ineffectiveKnowledges: number;
    averageAnalysisTime: number;
}

export async function summaryDashboard() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/v1/dashboard`)

    if (!res.ok) {
        throw new Error("Erro ao buscar dashboard")
    }

    const response: SummaryDashboardResponse = await res.json()

    return response
}

export function useSummaryDashboard() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: summaryDashboard
    })
}