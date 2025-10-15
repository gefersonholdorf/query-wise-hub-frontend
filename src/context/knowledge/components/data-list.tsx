/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { ErrorLoading } from "@/components/error-loading";
import { PaginationComponent } from "@/components/pagination";
import { useSearchParams } from "react-router-dom";
import { useFetchKnowledge } from "../http/use-fetch-knowledge";
import { Card } from "./card";

export function DataList() {
    const [searchParams] = useSearchParams();

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
            <PaginationComponent component="knowledge" page={data.page} total={data.total} totalPage={data.totalPage} />
        </div >
    );
}
