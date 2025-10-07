import { useState, type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { RequestDialogActions } from "./actions";
import { RequestDialogContent } from "./content";
import { RequestDialogHeader } from "./header";
import { RequestDialogWrapper } from "./wrapper";
import type { RequestAnalysis } from "@/models/request-analysis";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RequestDialog = {
    Wrapper: RequestDialogWrapper,
    Header: RequestDialogHeader,
    Actions: RequestDialogActions,
    Content: RequestDialogContent
}

export interface RequestDialogComponentProps {
    children: ReactNode
    action: 'edit' | 'view'
}

export function RequestDialogComponent({ children, action }: RequestDialogComponentProps) {

    const requestAnalysisExample: RequestAnalysis = {
        id: 1,
        problems: [
            "API retorna status 500 em ambiente de produção",
            "Tempo de resposta acima de 5 segundos em requisições críticas",
            "Erros intermitentes de autenticação com OAuth2",
            "Dados inconsistentes entre cache e banco de dados",
            "Logs não estão sendo enviados corretamente para o sistema de monitoramento"
        ],
        solution: "Revisar configuração do balanceador de carga, otimizar queries lentas, corrigir integração com o provedor OAuth2, alinhar políticas de invalidação de cache e reconfigurar o agente de logs.Revisar configuração do balanceador de carga, otimizar queries lentas, corrigir integração com o provedor OAuth2, alinhar políticas de invalidação de cache e reconfigurar o agente de logs.Revisar configuração do balanceador de carga, otimizar queries lentas, corrigir integração com o provedor OAuth2, alinhar políticas de invalidação de cache e reconfigurar o agente de logs.",
        tags: "Tag, infra, logs",
        observation: 'Aprovado',
        status: "PENDING",
        createdBy: "geferson.silva",
        createdAt: new Date("2025-09-23T14:30:00Z")
    }

    const [modalState, setModalState] = useState<'APPROVED' | 'DENIED' | 'DEFAULT'>('DEFAULT')
    const [handlers, setHandlers] = useState<{ update?: () => void; confirm?: () => void }>({});

    function handleSetModalState(state: 'APPROVED' | 'DENIED' | 'DEFAULT') {
        console.log('Chamou o handle setModal')
        setModalState(state)
    }

    return (
        <RequestDialog.Wrapper childrenTrigger={children}>
            <ScrollArea className="w-full h-150 pr-4">
                <div className="flex flex-col gap-4">
                    <RequestDialog.Header status={requestAnalysisExample.status} />
                    <RequestDialog.Content onModalState={modalState} requestAnalysis={requestAnalysisExample} action={action} state={modalState} onRegisterHandlers={setHandlers} />
                    <Separator />
                    <RequestDialog.Actions
                        status={requestAnalysisExample.status}
                        action={action}
                        onSetModalState={handleSetModalState}
                        state={modalState}
                        onUpdateSubmit={handlers.update ?? (() => { })}
                        onConfirmSubmit={handlers.confirm ?? (() => { })} />
                </div>
            </ScrollArea>
        </RequestDialog.Wrapper>
    )
}