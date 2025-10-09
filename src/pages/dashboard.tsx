/** biome-ignore-all assist/source/organizeImports: <!> */
import { PageHeader } from "@/components/page-header";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { DashboardComponent } from "@/context/dashboard/components/main";
import { MessageSquareMore } from "lucide-react";

export function DashboardPage() {
    return (
        <main className="h-full flex flex-col gap-2">
            <Breadcrumb className="text-[0.6rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageHeader
                title="Dashboard"
                description="Tela inicial do sistema, onde você pode ter acesso a informações e acompanhar resultados."
                icon={<MessageSquareMore size={15} />}
            />

            <div className="flex-1 w-full">
                <DashboardComponent />
            </div>
        </main>
    );
}

