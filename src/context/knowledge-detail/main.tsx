import { useState } from "react"
import { CommentsComponent } from "./comments"
import { Detail } from "./detail"
import { Wrapper } from "./wrapper"

export const KnowledgeDetail = {
    Wrapper: Wrapper,
    Detail: Detail,
    Comments: CommentsComponent
}

export function KnowledgeDetailComponent() {
    const [state, setState] = useState<'edit' | 'view'>('edit')

    function handleSetState(state: 'edit' | 'view') {
        setState(state)
    }
    return (
        <KnowledgeDetail.Wrapper>
            <KnowledgeDetail.Detail isAction={state} onSetState={handleSetState} analysis={{
                id: 1,
                observation: "Deve se abrir um chamado",
                problems: ['Teste', 'Teste1'],
                solution: 'Deve se abrir um chamado',
                createdAt: new Date(),
                createdBy: 'ADMIN',
                approvedAt: null,
                approvedBy: null,
                deniedAt: null,
                deniedBy: null,
                status: 'APPROVED',
                tags: '',
                stockHistory: [],
                updatedAt: new Date()
            }} />
            <div className="grid grid-cols-2">
                <KnowledgeDetail.Comments />
                <div></div>
            </div>
        </KnowledgeDetail.Wrapper>
    )
}