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
import { ChatComponent } from "@/context/chat/components/main";
import { RequestAnalysisComponent } from "@/context/request-analysis/components/main";
import { ClipboardList, MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";

export function ChatPage() {
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
                        <BreadcrumbPage>Chat Assistente</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Chat Assistente"
                description="Converse com o assistente para realizar as ações necessárias."
                icon={<MessageSquareMore size={15} />}
            />

            <div className="flex-1 w-full">
                <ChatComponent />
            </div>
        </main>
    );
}

