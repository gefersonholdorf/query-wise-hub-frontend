/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/complexity/noUselessFragments: <explanation> */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFetchAnalysis } from "@/context/request-analysis/http/use-fetch-analysis";
import { truncatedText } from "@/helpers/truncate-text";
import dayjs from "dayjs";
import { Clock, Search } from "lucide-react";
import { useNavigate } from "react-router";
dayjs.locale('pt-br');

export function AnalysisPendingComponent() {
    const { data, isLoading, isError } = useFetchAnalysis(1, 'PENDING', 5)
    const navigate = useNavigate()
    return (
        <Card className="py-3 gap-4">
            <div className="flex items-center justify-between px-4 py-1">
                <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center justify-between">
                        Análises Pendentes
                    </CardTitle>
                    <div className="flex text-sm text-gray-500 ">
                        {isLoading && (
                            <span className="bg-gray-200 rounded w-80 h-6 inline-block"></span>
                        )}
                        {data && (<span>Atualmente {data.total} análises necessitam revisão, exibindo {data.data.length} de {data.total}</span>)}

                    </div>
                </div>
                <Button onClick={() => navigate('/request-analysis')} className="bg-sky-500 hover:bg-sky-400 p-2">Ver Todas</Button>
            </div>
            <CardContent className="px-0">
                <ul className="grid grid-cols-[1fr_150px_120px_60px] px-4 py-2 text-sm text-gray-600 border-t border-b">
                    <li>Problema</li>
                    <li>Data de Criação</li>
                    <li>Status</li>
                    <li>Ação</li>
                </ul>

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

                {isError && (
                    <div className="flex flex-col w-full items-center justify-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                        <h3 className="text-lg font-bold text-red-700">Ops! Algo deu errado</h3>
                        <p className="text-sm text-red-500 text-center max-w-xs">
                            Tivemos um probleminha.
                            Não se preocupe, já estamos cuidando disso. Recarregue a página para continuar.
                        </p>

                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition-all"
                        >
                            Recarregar página
                        </Button>

                        <div className="mt-4 text-red-400 animate-bounce">💥</div>
                    </div>
                )}

                {data && (
                    <>
                        {data.data.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center p-6 pt-10 space-y-3">
                                <div className="text-4xl animate-bounce">✅</div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Tudo pronto!
                                </h2>
                                <p className="text-gray-600 text-center max-w-xs">
                                    A fila está totalmente limpa.
                                </p>
                            </div>
                        ) : (
                            <ul>
                                {data.data.map((item) => (
                                    <li
                                        key={item.id}
                                        className="grid grid-cols-[1fr_150px_120px_60px] items-center px-4 py-2 border-t text-sm text-gray-800 hover:transition hover:bg-gray-100"
                                    >
                                        <Tooltip>
                                            <TooltipTrigger className="flex justify-start">
                                                <span className="font-semibold">
                                                    {truncatedText({ text: item.problems[0], max: 20 })}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.problems[0]}</p>
                                            </TooltipContent>
                                        </Tooltip>
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
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => navigate(`/analysis/${item.id}`)}
                                                    >
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
                    </>
                )}
            </CardContent>
        </Card>
    )
}