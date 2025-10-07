/** biome-ignore-all lint/correctness/useUniqueElementIds: <"explanation"> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <"explanation"> */
/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Calculator, ChartSpline, Check, Clock, Loader, X } from "lucide-react";
import { CardComponent } from "./card";
import { RequestCard } from "./request-card";
import { Wrapper } from "./wrapper";
import { useEffect, useRef, useState } from 'react';
import { useFetchAnalysis } from '../http/use-fetch-analysis';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorLoading } from '@/components/error-loading';
import { useSummaryAnalysis } from '../http/use-summary-analysis';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [analysis, setAnalysis] = useState<Analysys[]>([]);
    const [filteringStatus, setFilteringStatus] = useState<'PENDING' | 'APPROVED' | 'DENIED'>('PENDING')
    const [hasMore, setHasMore] = useState(true)

    const { data, isFetching, isError } = useFetchAnalysis(currentPage, filteringStatus);
    const { data: summaryData, isFetching: summaryIsFetching } = useSummaryAnalysis()

    function handleSetFilteringStatus(status: 'PENDING' | 'APPROVED' | 'DENIED') {
        if (status === filteringStatus) {
            return
        }
        setHasMore(true)
        setAnalysis([])
        setCurrentPage(1)
        setFilteringStatus(status)
    }

    useEffect(() => {
        if (data?.data) {
            setAnalysis(prev => [...prev, ...data.data]);
            if (data.data.length === 0) {
                setHasMore(false);
                if (currentPage === 1) {
                    setAnalysis([])
                }
            }
        }
    }, [data]);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(entries => {
            // Só incrementa se não estiver carregando
            if (entries.some(entry => entry.isIntersecting) && !isFetching) {
                setCurrentPage(prev => prev + 1);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [isFetching]);

    if (isError) return <ErrorLoading />;

    return (
        <RequestAnalysis.Wrapper>
            <header className="grid grid-cols-5 gap-10">
                {summaryIsFetching ? (
                    <Skeleton className='w-full h-full rounded-2xl' />
                ) : (
                    <>
                        <Tooltip>
                            <TooltipTrigger>
                                <RequestAnalysis.Card select={filteringStatus === 'PENDING'} status='PENDING' onSetFiltering={handleSetFilteringStatus} title="Pendentes" value={String(summaryData?.totalPendings)} icon={<Clock />} color="amber" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Filtrar por solicitações pendentes.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RequestAnalysis.Card select={filteringStatus === 'APPROVED'} status='APPROVED' onSetFiltering={handleSetFilteringStatus} title="Aprovadas" value={String(summaryData?.totalApproveds)} icon={<Check />} color="emerald" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Filtrar por solicitações aprovadas.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RequestAnalysis.Card select={filteringStatus === 'DENIED'} status='DENIED' onSetFiltering={handleSetFilteringStatus} title="Negadas" value={String(summaryData?.totalDenieds)} icon={<X />} color="red" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Filtrar por solicitações negadas.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RequestAnalysis.Card title="Total de Solicitações" value={String(summaryData?.total)} icon={<Calculator />} color="gray" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de solicitações.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RequestAnalysis.Card title="Taxa de Aprovação" value={`${String(summaryData?.approvalRate)}%`} icon={<ChartSpline />} color="blue" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Porcentagem de aprovação de solicitações.</p>
                            </TooltipContent>
                        </Tooltip>
                    </>
                )}

            </header>
            <main className="pt-6 flex flex-col gap-4">
                {(isFetching && currentPage === 1) ? (
                    <Skeleton className="w-50 h-5" />
                ) : (
                    <span className="text-sm text-gray-600">{analysis.length} solicitação(ões) encontrada(s)</span>
                )}

                {(isFetching && currentPage === 1) ? (
                    <div>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index.toFixed()} className="w-full h-60 mb-4" />
                        ))}
                    </div>
                ) : analysis.map(item => (
                    <RequestAnalysis.RequestCard
                        key={item.id}
                        id={item.id}
                        problems={item.problems}
                        solution={item.solution}
                        createdAt={item.createdAt}
                        createdBy={item.createdBy}
                        status={item.status}
                    />
                ))}

                {isFetching && currentPage > 1 && (
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Loader className="animate-spin h-5 w-5 text-blue-500" />
                        <span className='text-sm text-gray-600'>Buscando mais itens...</span>
                    </div>
                )}

                {hasMore ? <div ref={sentinelRef}></div> : <div className="text-sm text-gray-600 w-full flex items-center justify-center">Todos os resultados foram carregados</div>}
            </main>
        </RequestAnalysis.Wrapper>
    )
}