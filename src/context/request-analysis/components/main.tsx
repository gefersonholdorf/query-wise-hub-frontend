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
            <header className="flex w-full">
                <div className='bg-gray-100 rounded-lg p-1 flex items-center gap-4'>
                    <div className='p-2 bg-white rounded-lg'>
                        <span className='text-sm font-medium text-gray-600'>Todas (8)</span>
                    </div>
                    <div className='p-2 bg-amber-50 rounded-lg'>
                        <span className='text-sm font-medium text-amber-600'>Pendentes (5)</span>
                    </div>
                    <div className='p-2 bg-emerald-50 rounded-lg'>
                        <span className='text-sm font-medium text-emerald-600'>Aprovadas (5)</span>
                    </div>
                    <div className='p-2 bg-red-50 rounded-lg'>
                        <span className='text-sm font-medium text-red-600'>Negadas (5)</span>
                    </div>
                </div>
            </header>
            <main className="pt-6 grid grid-cols-1 gap-4">
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