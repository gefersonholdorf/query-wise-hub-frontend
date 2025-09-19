import { Form } from "./form"
import { Wrapper } from "./wrapper"

export const CreateKnowledge = {
    Wrapper: Wrapper,
    Form: Form
}

export function CreateKnowledgeComponent() {
    return (
        <CreateKnowledge.Wrapper>
            <CreateKnowledge.Form />
        </CreateKnowledge.Wrapper>
    )
}