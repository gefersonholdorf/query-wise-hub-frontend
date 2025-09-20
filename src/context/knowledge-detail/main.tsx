import { Detail } from "./detail"
import { Wrapper } from "./wrapper"

export const CreateKnowledge = {
    Wrapper: Wrapper,
    Detail: Detail
}

export function KnowledgeDetailComponent() {
    return (
        <CreateKnowledge.Wrapper>
            <CreateKnowledge.Detail isAction="edit" knowledge={null} />
        </CreateKnowledge.Wrapper>
    )
}