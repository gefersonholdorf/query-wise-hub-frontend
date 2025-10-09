/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Activity, Box, CircleCheck, Database } from "lucide-react";

export function StatusServicesComponent() {
    return (
        <Card className="p-2 gap-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow">
            <CardTitle
                className="flex flex-col items-center gap-2"
            >
                <div className="flex items-center gap-1">
                    <Activity size={20} className="text-sky-600" />
                    Status dos Serviços
                </div>
            </CardTitle>
            <CardContent className="space-y-2">
                <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg">
                        <Activity className="text-emerald-500" />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">APLICAÇÃO</span>
                            <Badge className="bg-emerald-100 border border-emerald-200 text-emerald-600"><CircleCheck size={15} className="text-emerald-500" />Ativo</Badge>
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">Sistema operando normalmente</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg">
                        <Database className="text-emerald-500" />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">MYSQL</span>
                            <Badge className="bg-emerald-100 border border-emerald-200 text-emerald-600"><CircleCheck size={15} className="text-emerald-500" />Ativo</Badge>
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">Banco de dados operando normalmente</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-2">
                    <div className="p-2 bg-red-100 border border-red-200 rounded-lg">
                        <Box className="text-red-500" />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">QDRANT</span>
                            <Badge className="bg-red-100 border border-red-200 text-red-600"><CircleCheck size={15} className="text-red-500" />Inativo</Badge>
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">Vector DB operando normalmente</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}