"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
    { month: "Janeiro", quantidade: 186, aprovado: 80, negado: 106 },
    { month: "Fevereiro", quantidade: 305, aprovado: 200, negado: 105 },
    { month: "Março", quantidade: 237, aprovado: 200, negado: 37 },
    { month: "Abril", quantidade: 73, aprovado: 60, negado: 13 },
    { month: "Maio", quantidade: 209, aprovado: 200, negado: 9 },
    { month: "Junho", quantidade: 214, aprovado: 100, negado: 114 },
]

const chartConfig = {
    quantidade: {
        label: "quantidade",
        color: "blue",
    },
    aprovado: {
        label: "aprovado",
        color: "green",
    },
    negado: {
        label: "negado",
        color: "red",
    },
} satisfies ChartConfig

export function ChartLineAnalysis() {
    return (
        <Card className="h-90">
            <CardHeader>
                <CardTitle>Atividade Recente de Análises</CardTitle>
                <CardDescription>Janeiro - Junho 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-60">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="quantidade"
                            type="monotone"
                            stroke="blue"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="aprovado"
                            type="monotone"
                            stroke="green"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="negado"
                            type="monotone"
                            stroke="red"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
