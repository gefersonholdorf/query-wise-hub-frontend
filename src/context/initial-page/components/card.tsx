import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "lucide-react";

interface CardComponentProps {
    title: string
    value: number
}

export function CardComponent({ title, value }: CardComponentProps) {
    return (
        <Card className="transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow">
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Ticket className="text-gray-700" />
                        <span className="font-semibold text-gray-700">{title}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{value}</span>
                </div>
            </CardContent>
        </Card>
    )
}