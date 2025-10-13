import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

interface ParetoData {
  name: string;
  value: number;
  color?: string;
}

interface ParetoChartProps {
  title: string;
  description?: string;
  data: ParetoData[];
  dataKey?: string;
  nameKey?: string;
  height?: number;
  className?: string;
}

const ParetoChart = React.memo(({ 
  title,
  description,
  data,
  dataKey = "value",
  nameKey = "name",
  height = 300,
  className
}: ParetoChartProps) => {
  const formatTooltipValue = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {payload.map((item: any, idx: number) => {
            const isPercent = item.dataKey === "pareto";
            const labelName = item.name || (isPercent ? "Percentual acumulado (%)" : "Quantidade");
            const color = item.color || item.stroke || "hsl(var(--primary))";
            return (
              <p key={idx} className="flex items-center gap-2" style={{ color }}>
                <span className="font-medium">{labelName}:</span>
                <span>
                  {isPercent 
                    ? `${(item.value ?? 0).toFixed(1)}%`
                    : formatTooltipValue(Number(item.value ?? 0))}
                </span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const processedData = useMemo(() => {
    const key = dataKey as keyof ParetoData;
    const sorted = [...data].sort((a, b) => Number(b[key] ?? 0) - Number(a[key] ?? 0));
    const total = sorted.reduce((acc, item) => acc + Number(item[key] ?? 0), 0);
    let running = 0;
    return sorted.map((item) => {
      const value = Number(item[key] ?? 0);
      running += value;
      const pct = total > 0 ? (running / total) * 100 : 0;
      return { ...item, pareto: Number(pct.toFixed(2)) } as any;
    });
  }, [data, dataKey]);

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold truncate">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={processedData}
            margin={{ top: 10, right: 40, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={nameKey}
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              yAxisId="left"
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 12 }}
              label={{ value: "Quantidade", angle: -90, position: "insideLeft" }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 12 }}
              label={{ value: "Percentual acumulado (%)", angle: -90, position: "insideRight" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" wrapperStyle={{ fontSize: 12 }} />
            <Bar 
              dataKey={dataKey}
              yAxisId="left"
              name="Quantidade"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <Line 
              type="monotone"
              dataKey="pareto"
              yAxisId="right"
              name="Percentual acumulado (%)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

ParetoChart.displayName = "ParetoChart";

export default ParetoChart;