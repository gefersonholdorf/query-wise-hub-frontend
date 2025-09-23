/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { ChartSpline, Check, Clock, X } from "lucide-react"
import { CardComponent } from "./card"
import { Wrapper } from "./wrapper"
import { RequestCard } from "./request-card"

export const RequestAnalysis = {
    Wrapper: Wrapper,
    Card: CardComponent,
    RequestCard: RequestCard
}

export function RequestAnalysisComponent() {
    return (
        <RequestAnalysis.Wrapper>
            <header className="grid grid-cols-4 gap-10">
                <RequestAnalysis.Card title="Pendentes" value={3} icon={<Clock />} color="amber" />
                <RequestAnalysis.Card title="Aprovadas" value={3} icon={<Check />} color="emerald" />
                <RequestAnalysis.Card title="Negadas" value={3} icon={<X />} color="red" />
                <RequestAnalysis.Card title="Taxa de Aprovação" value={57} icon={<ChartSpline />} color="blue" />
            </header>
            <main className="pt-6 flex flex-col gap-4">
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