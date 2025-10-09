/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFetchAnalysis } from "@/context/request-analysis/http/use-fetch-analysis";
import { truncatedText } from "@/helpers/truncate-text";
import dayjs from "dayjs";
import { Clock, Search } from "lucide-react";
dayjs.locale('pt-br');

export function AnalysisPendingComponent() {
    const { data, isLoading, isError } = useFetchAnalysis(1, 'PENDING')
    return (
        <Card className="py-3 gap-4">
            <div className="flex items-center justify-between px-4 py-1">
                <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center justify-between">
                        Análises Pendentes
                    </CardTitle>
                    <div className="flex text-sm text-gray-500 ">
                        <span>
                            Atualmente 10 análises necessitam revisão, exibindo 5 de 10
                        </span>
                    </div>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-400 p-2">Ver Todas</Button>
            </div>
            <CardContent className="px-0">
                <ul className="grid grid-cols-[1fr_150px_120px_60px] px-4 py-2 text-sm text-gray-600 border-t border-b">
                    <li>Problema</li>
                    <li>Data de Criação</li>
                    <li>Status</li>
                    <li>Ação</li>
                </ul>

                {/* Skeleton enquanto carrega */}
                {isLoading && (
                    <ul>
                        {Array.from({ length: 5 }, (_, i) => (
                            <li
                                key={i.toString()}
                                className="grid grid-cols-[1fr_150px_120px_60px] items-center px-4 py-2 animate-pulse text-sm text-gray-400"
                            >
                                <span className="bg-gray-300 rounded w-24 h-8 inline-block"></span>
                                <span className="bg-gray-300 rounded w-20 h-8 inline-block"></span>
                                <span className="bg-gray-300 rounded w-16 h-8 inline-block"></span>
                                <span className="bg-gray-300 rounded w-12 h-8 inline-block"></span>
                            </li>
                        ))}
                    </ul>
                )}

                {data && (
                    <ul>
                        {data.data.map((item) => (
                            <li
                                key={item.id}
                                className="grid grid-cols-[1fr_150px_120px_60px] items-center px-4 py-2 border-t text-sm text-gray-800"
                            >
                                <span className="font-semibold">{truncatedText({ text: item.problems[0], max: 20 })}</span>
                                <span>{dayjs(new Date(item.createdAt)).format('DD/MM/YYYY HH:mm')}</span>
                                <span>
                                    {item.status === 'PENDING' && (
                                        <Badge className="bg-amber-500">
                                            <Clock /> Pendente
                                        </Badge>
                                    )}
                                </span>
                                <span>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="outline">
                                                <Search />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Revisar Análise.</p>
                                        </TooltipContent>
                                    </Tooltip>

                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}