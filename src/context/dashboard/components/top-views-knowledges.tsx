"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "A bar chart with a custom label"

const chartData = [
    { problem: "Não consigo entrar na minha conta!", views: 350, mobile: 80 },
    { problem: "Meus dados sumiram do sistema", views: 200, mobile: 200 },
    { problem: "O sistema está travando toda hora", views: 110, mobile: 120 },
    { problem: "O relatório que eu gero sai errado", views: 100, mobile: 190 },
    { problem: "Não consigo entender como usar essa tela", views: 20, mobile: 130 },
]

const chartConfig = {
    views: {
        label: "views",
        color: "var(--chart-2)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig

export function TopViewsKnowledges() {
    return (
        <Card className="h-90">
            <CardHeader>
                <CardTitle>Top 5 Conhecimentos mais visualizados</CardTitle>
                <CardDescription>Janeiro - Junho 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-60 w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="problem"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="views" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="views"
                            layout="vertical"
                            fill="var(--color-views)"
                            radius={4}
                        >

                            <LabelList
                                dataKey="views"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
