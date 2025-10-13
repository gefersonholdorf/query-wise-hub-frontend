/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import type { ReactNode } from "react";
import { RequestDialogConfirmWrapper } from "./wrapper";
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useConfirmAnalysis } from "../../../analysis-detail/http/use-confirm-analysis";

export const RequestDialog = {
    Wrapper: RequestDialogConfirmWrapper,
}

export interface RequestDialogComponentProps {
    children: ReactNode
    type: 'APPROVED' | 'DENIED'
    id: number
}

export function RequestDialogConfirmComponent({ children, type, id }: RequestDialogComponentProps) {

    const { mutateAsync: confirmAnalysis, isPending } = useConfirmAnalysis(id)

    async function handleConfirmAnalysis() {
        await confirmAnalysis({
            status: type
        })
    }

    return (
        <RequestDialog.Wrapper childrenTrigger={children}>
            <DialogHeader>
                <DialogTitle>Deseja {type === 'APPROVED' ? 'aprovar' : 'negar'} a análise?</DialogTitle>
                <DialogDescription>Essa ação não poderá ser desfeita</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        type="button"
                        className={type === "APPROVED" ? "bg-emerald-500" : "bg-red-500"}
                        onClick={handleConfirmAnalysis}
                        disabled={isPending}
                    >
                        Confirmar
                    </Button>
                </DialogClose>
            </DialogFooter>
        </RequestDialog.Wrapper >
    )
}