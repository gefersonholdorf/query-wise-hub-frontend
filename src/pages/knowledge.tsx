import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { KnowledgeComponent } from "@/context/knowledge/components/main";
import { BookOpen, Plus } from "lucide-react";

export function KnowledgePage() {
    return (
        <>
            <PageHeader title="Base de Conhecimento" description="Gerencie todos os conhecimentos do sistema" icon={<BookOpen size={15} />}>
                <Button className="bg-blue-500 hover:bg-blue-400"><Plus /> Novo Conhecimento</Button>
            </PageHeader>
            <KnowledgeComponent />
        </>
    );
}
