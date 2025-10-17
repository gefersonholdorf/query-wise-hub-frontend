/** biome-ignore-all assist/source/organizeImports: <!> */
import { PageHeader } from "@/components/page-header";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { InitialPageComponent } from "@/context/initial-page/components/main";
import { MessageSquareMore } from "lucide-react";

export function InitialPage() {
    return (
        <main className="h-full flex flex-col gap-2">
            <Breadcrumb className="text-[0.6rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Página Inicial</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Página Inicial"
                description="Bem-vindo ao sistema! Aqui você pode visualizar informações gerais, acessar funcionalidades importantes."
                icon={<MessageSquareMore size={15} />}
            />

            <div className="flex-1 w-full">
                <InitialPageComponent />
            </div>
        </main>
    );
}

