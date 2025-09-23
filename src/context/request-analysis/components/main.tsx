/** biome-ignore-all lint/correctness/useUniqueElementIds: <"explanation"> */
import { Calculator, ChartSpline, Check, Clock, X } from "lucide-react"
import { CardComponent } from "./card"
import { Wrapper } from "./wrapper"
import { RequestCard } from "./request-card"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const RequestAnalysis = {
    Wrapper: Wrapper,
    Card: CardComponent,
    RequestCard: RequestCard
}

export function RequestAnalysisComponent() {
    return (
        <RequestAnalysis.Wrapper>
            <header className="grid grid-cols-5 gap-10">
                <Tooltip>
                    <TooltipTrigger>
                        <RequestAnalysis.Card title="Pendentes" value={"3"} icon={<Clock />} color="amber" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Filtrar por solicitações pendentes.</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <RequestAnalysis.Card title="Aprovadas" value={"3"} icon={<Check />} color="emerald" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Filtrar por solicitações aprovadas.</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <RequestAnalysis.Card title="Negadas" value={"3"} icon={<X />} color="red" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Filtrar por solicitações negadas.</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <RequestAnalysis.Card title="Total de Solicitações" value={"9"} icon={<Calculator />} color="gray" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Quantitativo de solicitações.</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <RequestAnalysis.Card title="Taxa de Aprovação" value={"57%"} icon={<ChartSpline />} color="blue" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Porcentagem de aprovação de solicitações.</p>
                    </TooltipContent>
                </Tooltip>
            </header>
            <main className="pt-6 flex flex-col gap-4">
                <span className="text-sm text-gray-600">4 solicitação(ões) encontrada(s)</span>
                <RequestAnalysis.RequestCard
                    id="1"
                    problems={["Como visualizar a importação automática de uma apólice?Acesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importações", "Outro Teste"]}
                    solution="Acesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importações"
                    createdAt={new Date()}
                    createdBy="Geferson"
                    status='PENDING'
                />
                <RequestAnalysis.RequestCard
                    id="1"
                    problems={["Como visualizar a importação automática de uma apólice?Acesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importações", "Outro Teste"]}
                    solution="Acesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importaçõesAcesse o menu Apólice e clique no botão visualizar importações"
                    createdAt={new Date()}
                    createdBy="Geferson"
                    status='APPROVED'
                />
            </main>
        </RequestAnalysis.Wrapper>
    )
}