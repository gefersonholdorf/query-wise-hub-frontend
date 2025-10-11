import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowLeft, CircleCheckBig, CircleX } from "lucide-react";

interface ActionsComponentProps {
    status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export function ActionsComponent({ status }: ActionsComponentProps) {
    return (
        <Card className="p-4 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardTitle>Ações</CardTitle>
            <CardContent className="p-0">
                {status === 'PENDING' ? (
                    <div className="flex flex-col gap-2">
                        <Button
                            className="cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600 hover:text-white"
                        >
                            <CircleCheckBig className="text-white" />
                            Aprovar Conhecimento
                        </Button>

                        <Button
                            className="cursor-pointer text-red-500 border border-red-500 hover:text-red-500 hover:bg-red-50"
                            variant="outline"
                        >
                            <CircleX className="text-red-500" />
                            Rejeitar Conhecimento
                        </Button>
                        <Separator />
                        <Button
                            className="border-none cursor-pointer"
                            variant="outline"
                        >Cancelar</Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Button
                            className="border cursor-pointer"
                            variant="outline"
                        >
                            <ArrowLeft />
                            Voltar para Análises
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card >
    )
}