import { useParams } from "react-router"
import { useGetAnalysisById } from "../http/use-get-analysis-by-id"
import { Wrapper } from "./wrapper"
import { ActionsComponent } from "./actions"

export const AnalysisDetail = {
    Wrapper: Wrapper,
    Actions: ActionsComponent
}

export function AnalysisDetailComponent() {
    const { id } = useParams()
    const { data, isLoading, isError } = useGetAnalysisById(Number(id))
    return (
        <AnalysisDetail.Wrapper>
            {isLoading && (
                <div>Carregando...</div>
            )}
            {data && (
                <AnalysisDetail.Actions status={data.status} />
            )}
        </AnalysisDetail.Wrapper>
    )
}