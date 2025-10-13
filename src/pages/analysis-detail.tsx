/** biome-ignore-all assist/source/organizeImports: <!> */
import { PageHeader } from "@/components/page-header";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { AnalysisDetailComponent } from "@/context/analysis-detail/components/main";
import { MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";

export function AnalysisDetailPage() {
    return (
        <main className="h-full flex flex-col gap-2">
            <Breadcrumb className="text-[0.6rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={"/analysis"}>Análises</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Revisar Análise</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Revisar Análise"
                description="Revise e aprove ou rejeite este conhecimento"
                icon={<MessageSquareMore size={15} />}
            />

            <div className="flex-1 w-full">
                <AnalysisDetailComponent />
            </div>
        </main>
    );
}

