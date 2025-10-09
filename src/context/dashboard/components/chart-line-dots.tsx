/** biome-ignore-all lint/style/useImportType: <"explanation"> */
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

export const description = "A line chart with dots"

const chartData = [
  { month: "Janeiro", conhecimentos: 186, visualizações: 80 },
  { month: "Fevereiro", conhecimentos: 305, visualizações: 200 },
  { month: "Março", conhecimentos: 237, visualizações: 120 },
  { month: "Abril", conhecimentos: 73, visualizações: 190 },
  { month: "Maio", conhecimentos: 209, visualizações: 130 },
  { month: "Junho", conhecimentos: 214, visualizações: 140 },
]

const chartConfig = {
  conhecimentos: {
    label: "conhecimentos",
    color: "var(--chart-1)",
  },
  visualizações: {
    label: "visualizações",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartLineDots() {
  return (
    <Card className="h-100">
      <CardHeader>
        <CardTitle>Atividade Recente de Conhecimentos</CardTitle>
        <CardDescription>Janeiro - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="conhecimentos"
              type="natural"
              stroke="var(--color-conhecimentos)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-conhecimentos)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="visualizações"
              type="natural"
              stroke="blue"
              strokeWidth={2}
              dot={{
                fill: "blue",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
