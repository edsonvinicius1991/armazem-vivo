import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  title: string;
  description?: string;
  data: BarChartData[];
  dataKey?: string;
  nameKey?: string;
  orientation?: "vertical" | "horizontal";
  showGrid?: boolean;
  height?: number;
  className?: string;
}

const BarChart = React.memo(({
  title,
  description,
  data,
  dataKey = "value",
  nameKey = "name",
  orientation = "vertical",
  showGrid = true,
  height = 300,
  className
}: BarChartProps) => {
  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            <span className="font-medium">Valor: </span>
            {formatTooltipValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

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
          <RechartsBarChart 
            data={data} 
            layout={orientation === "horizontal" ? "horizontal" : "vertical"}
            margin={{ 
              top: 10, 
              right: 10, 
              left: orientation === "horizontal" ? 40 : 10, 
              bottom: orientation === "horizontal" ? 10 : 40 
            }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="opacity-30" 
                stroke="hsl(var(--border))"
              />
            )}
            {orientation === "horizontal" ? (
              <>
                <XAxis 
                  type="number" 
                  className="text-xs fill-muted-foreground" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey={nameKey} 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                  width={80}
                />
              </>
            ) : (
              <>
                <XAxis 
                  dataKey={nameKey} 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
              </>
            )}
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill="hsl(var(--primary))"
              radius={orientation === "horizontal" ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

BarChart.displayName = "BarChart";

export default BarChart;