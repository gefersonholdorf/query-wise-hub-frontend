import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"


export interface RequestDialogActionsProps {
    status: 'PENDING' | 'APPROVED' | 'DENIED'
    action: 'edit' | 'view'
    state: 'APPROVED' | 'DENIED' | 'DEFAULT'
    onSetModalState: (state: 'APPROVED' | 'DENIED' | 'DEFAULT') => void
}

export function RequestDialogActions({ status, action, onSetModalState, state }: RequestDialogActionsProps) {
    return (
        <div className="flex items-end justify-end gap-2">
            {action === 'edit' && (
                <>
                    <DialogClose asChild>
                        <Button className="border" variant="ghost">Fechar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="border bg-blue-500 hover:bg-blue-400" variant="default">Editar</Button>
                    </DialogClose>
                </>
            )}

            {(action === 'view' && status !== 'PENDING') && (
                <DialogClose asChild>
                    <Button className="border" variant="ghost">Fechar</Button>
                </DialogClose>
            )}

            {(action === 'view' && status === 'PENDING' && state === 'DEFAULT') && (
                <>
                    <DialogClose asChild>
                        <Button className="border" variant="ghost">Fechar</Button>
                    </DialogClose>
                    <Button
                        className="border border-red-500 text-red-500 hover:text-red-500"
                        variant="ghost"
                        onClick={() => onSetModalState('DENIED')}
                    >
                        <X /> Negar
                    </Button>
                    <Button
                        className="border border-emerald-500 text-emerald-500 hover:text-emerald-500"
                        variant="ghost"
                        onClick={() => onSetModalState('APPROVED')}
                    >
                        <Check /> Aprovar
                    </Button>
                </>
            )}

            {(action === 'view' && status === 'PENDING' && state === 'APPROVED') && (
                <>
                    <DialogClose asChild>
                        <Button className="border" variant="ghost">Fechar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="border border-emerald-500 text-emerald-500 hover:text-emerald-500"
                            variant="ghost"
                            onClick={() => onSetModalState('DEFAULT')}
                        >
                            <Check /> Confirmar
                        </Button>
                    </DialogClose>
                </>
            )}

            {(action === 'view' && status === 'PENDING' && state === 'DENIED') && (
                <>
                    <DialogClose asChild>
                        <Button className="border" variant="ghost">Fechar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="border border-red-500 text-red-500 hover:text-red-500"
                            variant="ghost"
                            onClick={() => onSetModalState('DEFAULT')}
                        >
                            <X /> Confirmar
                        </Button>
                    </DialogClose>
                </>
            )}
        </div>
    )
}