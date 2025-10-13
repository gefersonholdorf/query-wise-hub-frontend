/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CircleCheckBig, CircleX } from "lucide-react";
import { useNavigate } from "react-router";

interface ActionsComponentProps {
    status: 'PENDING' | 'APPROVED' | 'DENIED'
    onApprove: () => void
    onReject: () => void
    onIsLoading: boolean
    onIsDisable: boolean
}

export function ActionsComponent({ status, onApprove, onReject, onIsLoading, onIsDisable }: ActionsComponentProps) {
    const navigate = useNavigate()
    return (
        <Card className="p-4 py-1 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardContent className="p-0">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="leading-none font-semibold text-[1rem]">Ações</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            {status === 'PENDING' ? (
                                <div className="flex flex-col gap-2">
                                    <Button
                                        className="cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600 hover:text-white"
                                        disabled={onIsLoading || onIsDisable}
                                        onClick={() => onApprove()}
                                    >
                                        <CircleCheckBig className="text-white" />
                                        Aprovar Conhecimento
                                    </Button>

                                    <Button
                                        className="cursor-pointer text-red-500 border border-red-500 hover:text-red-500 hover:bg-red-50"
                                        disabled={onIsLoading || onIsDisable}
                                        onClick={() => onReject()}
                                        variant="outline"
                                    >
                                        <CircleX className="text-red-500" />
                                        Rejeitar Conhecimento
                                    </Button>
                                    <Separator />
                                    <Button
                                        className="border-none cursor-pointer"
                                        onClick={() => navigate('/analysis')}
                                        variant="outline"
                                    >Cancelar</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Button
                                        className="border cursor-pointer"
                                        variant="outline"
                                        onClick={() => navigate('/analysis')}
                                    >
                                        <ArrowLeft />
                                        Voltar para Análises
                                    </Button>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </CardContent>
        </Card >
    )
}