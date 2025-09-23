import { Badge } from "@/components/ui/badge";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export interface RequestDialogHeaderProps {
    status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export function RequestDialogHeader({ status }: RequestDialogHeaderProps) {
    return (
        <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                Detalhes da Solicitação
                {status === 'PENDING' && <Badge className='bg-amber-500 text-white'>Pendente</Badge>}
                {status === 'APPROVED' && <Badge className='bg-emerald-500 text-white'>Aprovado</Badge>}
                {status === 'DENIED' && <Badge className='bg-red-500 text-white'>Negado</Badge>}
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}