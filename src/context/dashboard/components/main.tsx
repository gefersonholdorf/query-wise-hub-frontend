/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <"explanation"> */
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Book, BookmarkCheck, BookmarkX, Calculator, ChartSpline, Check, Clock, Eye, TicketSlash, User2, X } from "lucide-react"
import { AnalysisPendingComponent } from "../../initial-page/components/analysis-pendings"
import { CardComponent } from "./card"
import { ChartLineAnalysis } from "./chart-line-analysis"
import { ChartLineDots } from "./chart-line-dots"
import { StatusServicesComponent } from "./status-services"
import { TopViewsKnowledges } from "./top-views-knowledges"
import { Wrapper } from "./wrapper"
import { useSummaryDashboard } from "../http/use-summary-dashboard"
import { Button } from "@/components/ui/button"
import { ChartPieInteractive } from "./pie-chart-interactive"


export const Dashboard = {
    Wrapper: Wrapper,
    Card: CardComponent,
}

export function DashboardComponent() {
    const { data, isLoading, isError } = useSummaryDashboard()

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
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 justify-center w-full gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span key={i.toString()} className="bg-gray-200 rounded inline-block"></span>
                        ))}
                    </div>
                )}
                {isError && (
                    <div className="flex flex-col w-full items-center justify-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                        <h3 className="text-lg font-bold text-red-700">Ops! Algo deu errado</h3>
                        <p className="text-sm text-red-500 text-center max-w-xs">
                            Tivemos um probleminha.
                            Não se preocupe, já estamos cuidando disso. Recarregue a página para continuar.
                        </p>

                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition-all"
                        >
                            Recarregar página
                        </Button>

                        <div className="mt-4 text-red-400 animate-bounce">💥</div>
                    </div>
                )}
                {data && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 justify-center w-full gap-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Total de Conhecimentos" value={String(data.totalKnowledges)} icon={<Book />} color="sky" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de conhecimentos.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Total de Visualizações" value={String(data.totalViews)} icon={<Eye />} color="gray" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo do total de visualizações de conhecimentos.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Total de Análises" value={String(data.totalAnalysis)} icon={<Calculator />} color="blue" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de análises.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Total de Usuários" value={String(data.totalUsers)} icon={<User2 />} color="gray" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de usuários.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Análises Pendentes" value={String(data.totalPendings)} icon={<Clock />} color="amber" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de análises pendentes.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Análises Aprovadas" value={String(data.totalApproveds)} icon={<Check />} color="emerald" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de análises aprovadas.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Análises Negadas" value={String(data.totalDenieds)} icon={<X />} color="red" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quantitativo de análises negadas.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Taxa de Aprovação" value={`${String(data.approvalRate)}%`} icon={<ChartSpline />} color="blue" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Porcentagem de aprovação de análises.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Conhecimentos Usados" value={`${String(data.knowledgesUsed)}`} icon={<TicketSlash />} color="gray" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Total de conhecimentos usados para responder o cliente.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Conhecimentos Eficazes" value={`${String(data.effectiveKnowledges)}`} icon={<BookmarkCheck />} color="emerald" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Total de conhecimentos que foram usados para responder o cliente e foram eficazes.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Conhecimentos Ineficazes" value={`${String(data.ineffectiveKnowledges)}`} icon={<BookmarkX />} color="red" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Total de conhecimentos que foram usados para responder o cliente e foram ineficazes.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Dashboard.Card title="Tempo Médio de Análise" value={`${String(data.averageAnalysisTime)}min`} icon={<Clock />} color="cyan" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tempo médio que uma soliticação é analisada.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartLineDots />
                <ChartPieInteractive />
                <TopViewsKnowledges />
                <ChartLineAnalysis />
            </div>
        </Dashboard.Wrapper>
    )
}