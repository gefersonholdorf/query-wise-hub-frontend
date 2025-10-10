/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { ErrorLoading } from "@/components/error-loading";
import { useFetchKnowledge } from "../http/use-fetch-knowledge";
import { Card } from "./card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DataList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const page = Number(searchParams.get("page")) || 1;
    const totalPerPage = Number(searchParams.get("totalPerPage")) || 9;
    const problem = searchParams.get("problem") || "";

    const {
        data,
        isPending,
        isError,
    } = useFetchKnowledge({ totalPerPage, page, problem });

    if (isPending) return <div>Carregando...</div>;

    if (isError) return <ErrorLoading />;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.data?.map((item) => (
                    <div key={item.id}>
                        <Card knowledge={item} />
                    </div>
                )
                )}
            </div>
            <div className="grid grid-cols-2 border border-gray-200 p-2 items-center rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Mostrando <span className="font-bold">{data.totalPage}</span> resultados de <span className="font-bold">{data.total}</span></span>
                <div className="flex items-center justify-between">
                    <Button
                        className={`cursor-pointer flex items-center gap-2`}
                        disabled={data.page <= 1}
                        onClick={() => navigate(`/knowledge?page=${data.page - 1}`)}
                    >
                        <ChevronLeft />
                        Anterior
                    </Button>
                    <div className="px-4 py-1 bg-sky-50 hover:bg-sky-100 border border-sky-500 cursor-pointer hover:border-sky-500 rounded-sm w-6 flex items-center justify-center">
                        {data.page}
                    </div>
                    <Button
                        className="p-1 rounded-sm flex items-center gap-2 border border-transparent hover:border-sky-500"
                        disabled={data.page >= data.total / data.totalPerPage}
                        onClick={() => navigate(`/knowledge?page=${data.page + 1}`)}
                    >
                        Próximo
                        <ChevronRight className="cursor-pointer" />
                    </Button>
                </div>
            </div>
        </div >
    );
}
