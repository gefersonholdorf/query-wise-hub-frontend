import { useNavigate, useParams } from "react-router"
import { useGetAnalysisById, type FetchGetAnalysisByIdResponse } from "../http/use-get-analysis-by-id"
import { Wrapper } from "./wrapper"
import { ActionsComponent } from "./actions"
import { DetailComponent } from "./detail"
import { InfoComponent } from "./info"
import { RevisionComponent } from "./revision"
import { HistoricalComponent } from "./historical"
import { Button } from "@/components/ui/button"
import { z } from "zod/v4"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useConfirmAnalysis } from "../http/use-confirm-analysis"
import { useEffect, useState } from "react"

export interface AnalysisDetail extends FetchGetAnalysisByIdResponse { }

export const AnalysisDetail = {
    Wrapper: Wrapper,
    Actions: ActionsComponent,
    Detail: DetailComponent,
    Info: InfoComponent,
    Revision: RevisionComponent,
    Historical: HistoricalComponent
}

const revisionSchema = z.object({
    observation: z.string().min(3, 'A revisão deve ter no mínimo 3 caracteres')
})

export type RevisionSchema = z.infer<typeof revisionSchema>

export function AnalysisDetailComponent() {
    const { id } = useParams()
    const { data, isLoading, isError } = useGetAnalysisById(Number(id))

    const [isSaved, setIsSaved] = useState(true)

    function handleSetIsSaved(state: boolean) {
        setIsSaved(state)
    }

    const revisionForm = useForm<RevisionSchema>({
        resolver: zodResolver(revisionSchema),
        defaultValues: {
            observation: ''
        }
    })

    useEffect(() => {
        if (data?.observation) {
            revisionForm.reset({ observation: data.observation ?? '' });
        }
    }, [data, revisionForm]);

    const observation = revisionForm.watch('observation');

    const { mutateAsync, isPending } = useConfirmAnalysis(Number(id))

    const navigate = useNavigate()

    async function handleRevisionForm(data: RevisionSchema, decision: 'APPROVED' | 'DENIED') {
        await mutateAsync({
            status: decision,
            observation: data.observation
        })

        revisionForm.reset()

        navigate('/analysis')
    }

    if (isError) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg animate-pulse">
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
        )
    }

    return (
        <AnalysisDetail.Wrapper>
            {isLoading && (
                <div>Carregando...</div>
            )}
            {data && (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <AnalysisDetail.Detail analysis={data} onIsSaved={isSaved} onSetIsSaved={handleSetIsSaved} />
                            <AnalysisDetail.Revision status={data.status} revisionForm={revisionForm} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <AnalysisDetail.Actions
                                status={data.status}
                                onApprove={() => revisionForm.handleSubmit((data) => handleRevisionForm(data, 'APPROVED'))()}
                                onReject={() => revisionForm.handleSubmit((data) => handleRevisionForm(data, 'DENIED'))()}
                                onIsLoading={isPending}
                                onIsDisable={observation.length < 3}
                                onIsSaved={isSaved}
                            />
                            <AnalysisDetail.Historical />
                            <AnalysisDetail.Info analysis={data} />
                        </div>
                    </div>
                </div>
            )}
        </AnalysisDetail.Wrapper>
    )
}