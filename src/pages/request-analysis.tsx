/** biome-ignore-all assist/source/organizeImports: <!> */
import { PageHeader } from "@/components/page-header";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RequestAnalysisComponent } from "@/context/request-analysis/components/main";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

export function RequestAnalysisPage() {
    return (
        <main className="h-full flex flex-col gap-2">
            <Breadcrumb className="text-[0.6rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={"/request-analysis"}>Análise de Solicitações</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Análise de Solicitações</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Análise de Solicitações"
                description="Gerencie as solicitações de novos conhecimentos."
                icon={<ClipboardList size={15} />}
            />

            <div className="flex-1 w-full">
                <RequestAnalysisComponent />
            </div>
        </main>
    );
}

