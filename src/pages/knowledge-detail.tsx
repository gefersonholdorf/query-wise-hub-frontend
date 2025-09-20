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
import { KnowledgeDetailComponent } from "@/context/knowledge-detail/main";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export function KnowledgeDetailPage() {
    return (
        <main className="h-full flex flex-col gap-2">
            <Breadcrumb className="text-[0.6rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={"/knowledge"}>Base de Conhecimento</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Visualizar/Editar Conhecimento</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Visualizar/Editar Conhecimento"
                description="Aqui você pode visualizar ou atualizar os detalhes do conhecimento selecionado."
                icon={<Pencil size={15} />}
            />

            <div className="flex-1 w-full flex items-center">
                <KnowledgeDetailComponent />
            </div>
        </main>
    );
}

