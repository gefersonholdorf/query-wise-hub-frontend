import { PageHeader } from "@/components/page-header";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { KnowledgeComponent } from "@/context/knowledge/components/main";
import { BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export function KnowledgePage() {
    const navigate = useNavigate()

    return (
        <>
            <div className="mb-2">
                <Breadcrumb className="text-[0.6rem]">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Base de Conhecimento</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <PageHeader title="Base de Conhecimento" description="Gerencie todos os conhecimentos do sistema" icon={<BookOpen size={15} />}>
                <Button onClick={() => navigate('/create-knowledge')} className="bg-blue-500 hover:bg-blue-400"><Plus /> Novo Conhecimento</Button>
            </PageHeader>
            <KnowledgeComponent />
        </>
    );
}
