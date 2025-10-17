/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <"explanation"> */
import { AnalysisPendingComponent } from "./analysis-pendings"
import { PresentationComponent } from "./presentation"
import { Wrapper } from "./wrapper"
import { KnowledgesMostViewedComponent } from "./knowledges-most-viewed"
import { CardComponent } from "./card"


export const InitialPage = {
    Wrapper: Wrapper,
    Presentation: PresentationComponent,
    AnalysisPending: AnalysisPendingComponent,
    KnowledgesMostViewed: KnowledgesMostViewedComponent,
    Card: CardComponent
}

export function InitialPageComponent() {
    return (
        <InitialPage.Wrapper>
            <InitialPage.Presentation />
            <div className="grid grid-cols-3 gap-4">
                <InitialPage.Card title="Chamados Abertos Hoje" value={10} />
                <InitialPage.Card title="Chamados Pendentes Hoje" value={8} />
                <InitialPage.Card title="Chamados Resolvidos Hoje" value={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InitialPage.AnalysisPending />
                <InitialPage.KnowledgesMostViewed />
            </div>
        </InitialPage.Wrapper>
    )
}