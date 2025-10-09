import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CardComponent } from "./card"
import { Wrapper } from "./wrapper"
import { Book, Bookmark, BookmarkCheck, BookmarkX, Calculator, ChartSpline, Check, Clock, Eye, TicketSlash, User2, View, X } from "lucide-react"
import { ChartLineDots } from "./chart-line-dots"
import { AnalysisPendingComponent } from "./analysis-pendings"
import { TopViewsKnowledges } from "./top-views-knowledges"
import { ChartLineAnalysis } from "./chart-line-analysis"
import { StatusServicesComponent } from "./status-services"


export const Dashboard = {
    Wrapper: Wrapper,
    Card: CardComponent,
}

export function DashboardComponent() {

    return (
        <Dashboard.Wrapper>
            <div className="flex flex-col lg:flex-row gap-4">
                <Tooltip>
                    <TooltipTrigger>
                        <StatusServicesComponent />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Status dos serviços necessários para a aplicação rodar.</p>
                    </TooltipContent>
                </Tooltip>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Total de Conhecimentos" value={String(10)} icon={<Book />} color="sky" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de conhecimentos.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Total de Visualizações" value={String(120)} icon={<Eye />} color="gray" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo do total de visualizações de conhecimentos.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Total de Análises" value={String(10)} icon={<Calculator />} color="blue" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de análises.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Total de Usuários" value={String(5)} icon={<User2 />} color="gray" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de usuários.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Análises Pendentes" value={String(10)} icon={<Clock />} color="amber" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de análises pendentes.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Análises Aprovadas" value={String(10)} icon={<Check />} color="emerald" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de análises aprovadas.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Análises Negadas" value={String(10)} icon={<X />} color="red" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Quantitativo de análises negadas.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Taxa de Aprovação" value={`${String(80)}%`} icon={<ChartSpline />} color="blue" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Porcentagem de aprovação de análises.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Conh. Usados" value={`${String(50)}`} icon={<TicketSlash />} color="gray" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Total de conhecimentos usados para responder o cliente.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Conh. Eficazes" value={`${String(5)}`} icon={<BookmarkCheck />} color="emerald" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Total de conhecimentos que foram usados para responder o cliente e foram eficazes.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Conh. Ineficazes" value={`${String(40)}`} icon={<BookmarkX />} color="red" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Total de conhecimentos que foram usados para responder o cliente e foram ineficazes.</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dashboard.Card title="Tempo Médio de Análise" value={`${String(5)}min`} icon={<Clock />} color="cyan" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Tempo médio que uma soliticação é analisada.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartLineDots />
                <AnalysisPendingComponent />
                <TopViewsKnowledges />
                <ChartLineAnalysis />
            </div>
        </Dashboard.Wrapper>
    )
}