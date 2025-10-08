import { ErrorLoading } from "@/components/error-loading";
import { useFetchKnowledge } from "../http/use-fetch-knowledge";
import { Card } from "./card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataList() {
    const {
        data,
        isPending,
        isError,
    } = useFetchKnowledge({});

    if (isPending) return <div>Carregando...</div>;

    if (isError) return <ErrorLoading />;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                {data.data?.map((item) => (
                    <div key={item.id}>
                        <Card knowledge={item} />
                    </div>
                )
                )}
            </div>
            <div className="grid grid-cols-2">
                <span className="text-sm text-gray-600">Mostrando <span className="font-bold">{data.total}</span> resultados</span>
                <div className="flex items-center justify-end">
                    <div>
                        <ChevronLeft />
                    </div>
                    <div>
                        {data.page}
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
