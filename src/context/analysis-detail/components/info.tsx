/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { AnalysisDetail } from "./main";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Clock } from "lucide-react";

dayjs.locale('pt-br');

interface InfoComponentProps {
    analysis: AnalysisDetail
}

export function InfoComponent({ analysis }: InfoComponentProps) {
    const tags = analysis.tags?.split(', ')
    return (
        <Card className="p-4 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardTitle>Informações</CardTitle>
            <CardContent className="p-0 space-y-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Criado por</span>
                    <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{analysis.createdBy}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Criado em</span>
                    <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{dayjs(analysis.createdAt).format('DD/MM/YYYY HH:MM')}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Atualizado em</span>
                    <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{dayjs(analysis.updatedAt).format('DD/MM/YYYY HH:MM')}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Status</span>
                    {analysis.status === 'PENDING' && <Badge className="bg-amber-100 text-amber-700 border border-amber-300"><Clock />PENDENTE</Badge>}
                    {analysis.status === 'APPROVED' && <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300"><CircleCheck />APROVADO</Badge>}
                    {analysis.status === 'DENIED' && <Badge className="bg-red-100 text-red-700 border border-red-300"><CircleX />NEGADO</Badge>}
                </div>
                <div className="flex flex-col gap-1">
                    {tags && <span className="text-sm text-gray-600">Tags</span>}
                    <div className="flex items-center gap-2">
                        {(tags && tags.length > 0) && (
                            <>
                                {tags.map((item, index) => (
                                    <div key={index} className="p-1 rounded-lg border bg-gray-50">
                                        <span className="text-sm text-gray-600">{item}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                {analysis.status === 'APPROVED' && (
                    <>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">Aprovado em</span>
                            <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{dayjs(analysis.approvedAt).format('DD/MM/YYYY HH:MM')}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">Aprovado por</span>
                            <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{analysis.approvedBy}</span>
                        </div>
                    </>
                )}
                {analysis.status === 'DENIED' && (
                    <>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">Negado em</span>
                            <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{dayjs(analysis.deniedAt).format('DD/MM/YYYY HH:MM')}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">Negado por</span>
                            <span className="text-sm text-gray-800 bg-gray-50 p-1 rounded-lg pl-2 font-medium">{analysis.deniedBy}</span>
                        </div>
                    </>
                )}
            </CardContent>
        </Card >
    )
}