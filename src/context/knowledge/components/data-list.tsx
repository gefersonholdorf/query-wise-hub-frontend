import { useCallback, useRef } from "react";
import { useFetchKnowledge } from "../http/use-fetch-knowledge";
import { Knowledge } from "./main";

export function DataList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
    } = useFetchKnowledge();

    const observerRef = useRef<IntersectionObserver | null>(null);

    const observeLastItem = useCallback(
        (node: HTMLDivElement) => {
            if (isFetchingNextPage) return;

            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    if (isPending) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar dados</div>;

    const items = data?.pages.flatMap((page) =>
        page.data.map((item) => (
            <Knowledge.Card key={item.id} problem={item.payload.problem} soluction={item.payload.solution} createdAt={new Date()} createdBy="Gefe" status={true} updatedAt={new Date()} />
        ))
    );

    return (
        <div className="h-[800px] overflow-auto p-4 flex flex-col gap-2">
            {items?.map((item, index) => {
                // Referência apenas no último item
                if (index === items.length - 1) {
                    return (
                        <div ref={observeLastItem} key={item.key}>
                            {item}
                        </div>
                    );
                }
                return <div key={item.key}>{item}</div>;
            })}

            {isFetchingNextPage && (
                <div className="text-center py-2 text-gray-500">Carregando mais...</div>
            )}

            {!hasNextPage && (
                <div className="text-center py-2 text-gray-400">
                    Todos os resultados retornados.
                </div>
            )}
        </div>
    );
}
