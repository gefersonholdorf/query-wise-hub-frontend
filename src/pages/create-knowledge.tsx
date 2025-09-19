/** biome-ignore-all assist/source/organizeImports: <!> */
import { PageHeader } from "@/components/page-header";
import { CreateKnowledgeComponent } from "@/context/create-knowledge/components/main";
import { Plus } from "lucide-react";

export function CreateKnowledgePage() {
    return (
        <main className="h-full flex flex-col gap-6">
            <PageHeader
                title="Novo Conhecimento"
                description="Cadastre um novo item na base de conhecimento."
                icon={<Plus size={15} />}
            />

            <div className="flex-1 w-full flex items-center">
                <CreateKnowledgeComponent />
            </div>
        </main>
    );
}

