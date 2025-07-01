"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { feedbackData } from "@/data/mock-data"

const chartConfig = {
    count: {
        label: "Responses",
        color: "hsl(var(--primary))",
    },
}

export function FeedbackChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Rating Distribution</CardTitle>
        <CardDescription>Aggregated anonymous feedback from students.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={feedbackData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="rating"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
