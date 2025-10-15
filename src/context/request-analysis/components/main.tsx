/** biome-ignore-all lint/correctness/useUniqueElementIds: <"explanation"> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <"explanation"> */
/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { ErrorLoading } from '@/components/error-loading';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleCheck, CircleX, Clock, Eye, Loader, Search } from "lucide-react";
import { useState } from 'react';
import { useFetchAnalysis } from '../http/use-fetch-analysis';
import { CardComponent } from "./card";
import { RequestCard } from "./request-card";
import { Wrapper } from "./wrapper";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import dayjs from 'dayjs';
import { truncatedText } from '@/helpers/truncate-text';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useSearchParams } from 'react-router';
import { PaginationComponent } from '@/components/pagination';
import { da } from 'zod/v4/locales';

export const RequestAnalysis = {
    Wrapper: Wrapper,
    Card: CardComponent,
    RequestCard: RequestCard
}

export interface Analysys {
    id: number,
    problems: string[]
    solution: string
    createdAt: Date
    createdBy: string
    tags: string | null
    status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export function RequestAnalysisComponent() {
    const [filteringStatus, setFilteringStatus] = useState<'PENDING' | 'APPROVED' | 'DENIED' | undefined>(undefined)

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const totalPerPage = Number(searchParams.get("totalPerPage")) || 2;

    const { data, isLoading, isError } = useFetchAnalysis(page, filteringStatus, totalPerPage);


    function handleSetFilteringStatus(status: 'PENDING' | 'APPROVED' | 'DENIED' | undefined) {
        if (status === filteringStatus) return;

        setFilteringStatus(status);

        const params = new URLSearchParams(searchParams.toString());

        if (!status) {
            params.delete("status");
        } else {
            params.set("status", status);
        }

        params.set("page", "1");

        setSearchParams(params);
    }

    if (isError) return <ErrorLoading />;

    return (
        <RequestAnalysis.Wrapper>
            <header className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                <div className='bg-gray-50 rounded-lg p-2 px-6 flex items-center gap-4 border border-gray-100'>
                    <div
                        className={`cursor-pointer p-2 text-sm font-medium ${filteringStatus === undefined ? 'bg-sky-50 text-sky-600 border border-sky-300 font-medium' : ' bg-gray-50 text-gray-600'} rounded-lg px-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow`}
                        onClick={() => handleSetFilteringStatus(undefined)}
                    >
                        <span>Todos (5)</span>
                    </div>
                    <div
                        className={`cursor-pointer p-2 text-sm font-medium ${filteringStatus === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-300 font-medium' : ' bg-gray-50 text-gray-700'} rounded-lg px-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow`}
                        onClick={() => handleSetFilteringStatus('PENDING')}
                    >
                        <span>Pendentes (5)</span>
                    </div>
                    <div
                        className={`cursor-pointer p-2 text-sm font-medium ${filteringStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 font-medium' : ' bg-gray-50 text-gray-700'} rounded-lg px-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow`}
                        onClick={() => handleSetFilteringStatus('APPROVED')}
                    >
                        <span>Aprovadas (5)</span>
                    </div>
                    <div
                        className={`cursor-pointer p-2 text-sm font-medium ${filteringStatus === 'DENIED' ? 'bg-red-50 text-red-600 border border-red-300 font-medium' : ' bg-gray-50 text-gray-700'} rounded-lg px-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow`}
                        onClick={() => handleSetFilteringStatus('DENIED')}
                    >
                        <span>Negadas (5)</span>
                    </div>
                </div>
                <div className="relative w-full flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Buscar por título..."
                        className="pl-10 h-12 bg-gray-50 shadow-sm focus-visible:ring-0 focus:outline-sky-500
                            focus:shadow-none border-2 focus:border-sky-500 text-gray-600 rounded-2xl"
                    />
                </div>
            </header>
            <main className="pt-6 grid grid-cols-1 gap-4">
                <Card className="py-3 gap-4 px-4">
                    <CardContent className="px-0">
                        <ul className="grid grid-cols-[50px_1fr_150px_150px_120px_60px] px-4 py-2 text-sm text-gray-600 border-b">
                            <li>Id</li>
                            <li>Problema</li>
                            <li>Data de Criação</li>
                            <li>Criado por</li>
                            <li>Status</li>
                            <li>Ação</li>
                        </ul>

                        {isLoading && (
                            <ul>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <li
                                        key={i.toString()}
                                        className="grid grid-cols-[50px_1fr_150px_150px_120px_60px] items-center gap-2 px-4 py-2 animate-pulse text-sm text-gray-400"
                                    >
                                        <span className="bg-gray-300 w-50 h-10 rounded inline-block"></span>
                                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {data && (
                            <>
                                {data.data.length === 0 ? (
                                    <div className="flex h-full flex-col items-center justify-center p-6 pt-10 space-y-3">
                                        <p>Nenhum dado...</p>
                                    </div>
                                ) : (
                                    <ul>
                                        {data.data.map((item) => (
                                            <li
                                                key={item.id}
                                                className="grid grid-cols-[50px_1fr_150px_150px_120px_60px] items-center px-4 py-2 border-t text-sm text-gray-800 hover:transition hover:bg-gray-100"
                                            >
                                                <span>{item.id}</span>
                                                <Tooltip>
                                                    <TooltipTrigger className="flex justify-start">
                                                        <span className="font-semibold">
                                                            {truncatedText({ text: item.problems[0], max: 60 })}
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{item.problems[0]}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <span>{dayjs(new Date(item.createdAt)).format('DD/MM/YYYY HH:mm')}</span>
                                                <span>{item.createdBy}</span>
                                                <span>
                                                    {item.status === 'PENDING' && (
                                                        <Badge className="bg-amber-500">
                                                            <Clock /> Pendente
                                                        </Badge>
                                                    )}
                                                    {item.status === 'APPROVED' && (
                                                        <Badge className="bg-emerald-500">
                                                            <CircleCheck /> Aprovado
                                                        </Badge>
                                                    )}
                                                    {item.status === 'DENIED' && (
                                                        <Badge className="bg-red-500">
                                                            <CircleX /> Negado
                                                        </Badge>
                                                    )}
                                                </span>
                                                <span>
                                                    {item.status === 'PENDING' ? (
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
                                                    ) : (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => navigate(`/analysis/${item.id}`)}
                                                                >
                                                                    <Eye />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Visualizar Análise.</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </CardContent>
                    {isLoading && (
                        <span className="bg-gray-300 h-10 rounded inline-block"></span>
                    )}
                    {data && (
                        <PaginationComponent page={data.page} total={data.total} pageSize={data.pageSize} totalPages={data.totalPages} component='analysis' maxVisible={5} />
                    )}
                </Card>
            </main>
        </RequestAnalysis.Wrapper>
    )
}