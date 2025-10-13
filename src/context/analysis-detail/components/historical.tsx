/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Clock } from "lucide-react";

dayjs.locale('pt-br')

interface Historical {
    id: number
    action: string
    date: Date
    status?: 'PENDING' | 'APPROVED' | 'DENIED'
}

const history: Historical[] = [
    {
        id: 1,
        action: 'Criado por Sophia Clark',
        date: new Date('2024-07-26'),
    },
    {
        id: 2,
        action: 'Revisado por Marcos Silva',
        date: new Date('2024-07-27'),
        status: 'DENIED',
    },
    {
        id: 3,
        action: 'Revisado por Ana Torres',
        date: new Date('2024-07-28'),
        status: 'APPROVED',
    },
];

export function HistoricalComponent() {
    return (
        <Card className="px-4 py-1 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <CardContent className="p-0">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="leading-none font-semibold text-[1rem]">Histórico de Ações</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            {history.map((item, index) => {
                                return (
                                    <div key={item.id} className="flex gap-2 items-stretch">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <Separator orientation="vertical" className="flex-1" />
                                        </div>
                                        <div className={`flex flex-col gap-1 p-2 rounded-lg items-start ${index === 0 && 'border w-full bg-gray-100'}`}>
                                            <span className="text-sm font-semibold text-gray-800">{item.action}</span>
                                            <span className="text-sm text-sky-800">{dayjs(item.date).format('DD/MM/YYYY HH:MM')}</span>
                                            {item.status === 'PENDING' && <Badge className="bg-amber-100 text-amber-700 border border-amber-300"><Clock />Pendente</Badge>}
                                            {item.status === 'APPROVED' && <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300"><CircleCheck />Aprovado</Badge>}
                                            {item.status === 'DENIED' && <Badge className="bg-red-100 text-red-700 border border-red-300"><CircleX />Negado</Badge>}
                                        </div>
                                    </div>
                                )
                            })}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card >
    )
}