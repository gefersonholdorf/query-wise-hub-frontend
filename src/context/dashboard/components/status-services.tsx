/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Activity, Box, CircleCheck, Database, LoaderCircle } from "lucide-react";
import { useStatusApplication, useStatusDatabases } from "../http/use-status-services";

export function StatusServicesComponent() {
    const { data: statusDatabase, isLoading: statusDatabaseLoading, isError: statusDatabaseError } = useStatusDatabases()
    const { data: statusApplication, isLoading: statusApplicationLoading, isError: statusApplicationError } = useStatusApplication()

    return (
        <Card className="p-2 w-90 gap-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow">
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
                    <div className={`p-3 ${statusApplication && 'bg-emerald-100 border border-emerald-200'} ${statusApplicationError && 'bg-red-100 border border-red-200'} ${statusApplicationLoading && 'bg-amber-100 border border-amber-200'} rounded-lg`}>
                        <Activity className={`${statusApplication && 'text-emerald-500'} ${statusApplicationError && 'text-red-500'} ${statusApplicationLoading && 'text-amber-500'}`} />
                    </div>
                    <div className="w-full text-start">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">APLICAÇÃO</span>
                            {statusApplicationLoading ? (
                                <Badge className="bg-amber-100 border border-amber-200 text-amber-600">
                                    <LoaderCircle className="animate-spin h-4 w-4" />
                                </Badge>
                            ) : statusApplicationError ? (
                                <Badge className="bg-red-100 border border-red-200 text-red-600">
                                    <CircleCheck size={15} className="text-red-500" />
                                    Inativo
                                </Badge>
                            ) : statusApplication ? (
                                <Badge className="bg-emerald-100 border border-emerald-200 text-emerald-600">
                                    <CircleCheck size={15} className="text-emerald-500" />
                                    Ativo
                                </Badge>
                            ) : null}
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">{statusApplication && 'Aplicação operando normalmente'}{statusApplicationError && 'Aplicação offline'}</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-2">
                    <div className={`p-3 ${(statusDatabase && statusDatabase.mysql === true) && 'bg-emerald-100 border border-emerald-200'} ${(statusDatabaseError || statusDatabase?.mysql === false) && 'bg-red-100 border border-red-200'} ${statusDatabaseLoading && 'bg-amber-100 border border-amber-200'} rounded-lg`}>
                        <Database className={`${(statusDatabase && statusDatabase.mysql === true) && 'text-emerald-500'} ${(statusDatabaseError || statusDatabase?.mysql === false) && 'text-red-500'} ${statusDatabaseLoading && 'text-amber-500'}`} />
                    </div>
                    <div className="w-full text-start">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">MYSQL</span>
                            {statusDatabaseLoading ? (
                                <Badge className="bg-amber-100 border border-amber-200 text-amber-600">
                                    <LoaderCircle className="animate-spin h-4 w-4" />
                                </Badge>
                            ) : statusDatabaseError || statusDatabase?.mysql === false ? (
                                <Badge className="bg-red-100 border border-red-200 text-red-600">
                                    <CircleCheck size={15} className="text-red-500" />
                                    Inativo
                                </Badge>
                            ) : statusDatabase?.mysql === true ? (
                                <Badge className="bg-emerald-100 border border-emerald-200 text-emerald-600">
                                    <CircleCheck size={15} className="text-emerald-500" />
                                    Ativo
                                </Badge>
                            ) : null}
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">{(statusDatabase && statusDatabase.mysql === true) && 'Banco de Dados operando normalmente'}{(statusDatabaseError || statusDatabase?.mysql === false) && 'Banco de Dados offline'}</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-2">
                    <div className={`p-3 ${(statusDatabase && statusDatabase.qdrant === true) && 'bg-emerald-100 border border-emerald-200'} ${(statusDatabaseError || statusDatabase?.qdrant === false) && 'bg-red-100 border border-red-200'} ${statusDatabaseLoading && 'bg-amber-100 border border-amber-200'} rounded-lg`}>
                        <Box className={`${(statusDatabase && statusDatabase.qdrant === true) && 'text-emerald-500'} ${(statusDatabaseError || statusDatabase?.qdrant === false) && 'text-red-500'} ${statusDatabaseLoading && 'text-amber-500'}`} />
                    </div>
                    <div className="w-full text-start">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-semibold">QDRANT</span>
                            {statusDatabaseLoading ? (
                                <Badge className="bg-amber-100 border border-amber-200 text-amber-600">
                                    <LoaderCircle className="animate-spin h-4 w-4" />
                                </Badge>
                            ) : statusDatabaseError || statusDatabase?.qdrant === false ? (
                                <Badge className="bg-red-100 border border-red-200 text-red-600">
                                    <CircleCheck size={15} className="text-red-500" />
                                    Inativo
                                </Badge>
                            ) : statusDatabase?.qdrant === true ? (
                                <Badge className="bg-emerald-100 border border-emerald-200 text-emerald-600">
                                    <CircleCheck size={15} className="text-emerald-500" />
                                    Ativo
                                </Badge>
                            ) : null}
                        </div>
                        <div>
                            <span className="text-[.8rem] text-gray-700 leading-[0.9rem]">{(statusDatabase && statusDatabase.qdrant === true) && 'Vector DB operando normalmente'}{(statusDatabaseError || statusDatabase?.qdrant === false) && 'Vector DB offline'}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}