/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { RevisionSchema } from "./main";

interface RevisionComponentProps {
    status: 'PENDING' | 'APPROVED' | 'DENIED'
    revisionForm: UseFormReturn<RevisionSchema>
}

export function RevisionComponent({ status, revisionForm }: RevisionComponentProps) {
    return (
        <Card className="p-4 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardTitle>Adicionar Revisão</CardTitle>
            <CardContent className="p-0 space-y-2">
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="text-sky-500" size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Adicione observações detalhadas sobre sua decisão de aprovação ou rejeição. Estas informações ajudarão a manter um histórico claro das revisões. Para deixar a revisão salva, lembre-se de aprovar ou rejeitar a análise.</p>
                        </TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-gray-600">Descrição da Revisão *</span>
                </div>
                <Textarea
                    className='border p-2 rounded-sm bg-gray-50 break-all whitespace-pre-wrap overflow-x-hidden resize-y w-full min-h-30'
                    {...revisionForm.register("observation")}
                    placeholder="Descreva os motivos da sua decisão..."
                    disabled={status === 'APPROVED' || status === 'DENIED'}
                />
                {revisionForm.formState.errors.observation && (
                    <p className="text-red-500 text-sm">
                        {revisionForm.formState.errors.observation.message}
                    </p>
                )}
            </CardContent>
        </Card >
    )
}

// Adicione observações detalhadas sobre sua decisão de aprovação ou rejeição.Estas informações ajudarão a manter um histórico claro das revisões.