import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface LineChartData {
  name: string;
  value: number;
  date?: string;
}

interface LineChartProps {
  title: string;
  description?: string;
  data: LineChartData[];
  dataKey?: string;
  nameKey?: string;
  showGrid?: boolean;
  showDots?: boolean;
  height?: number;
  color?: string;
  className?: string;
  formatValue?: (value: number) => string;
}

const LineChart = React.memo(({
  title,
  description,
  data,
  dataKey = "value",
  nameKey = "name",
  showGrid = true,
  showDots = false,
  height = 300,
  color = "hsl(var(--primary))",
  className,
  formatValue
}: LineChartProps) => {
  const defaultFormatValue = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  const valueFormatter = formatValue || defaultFormatValue;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            <span className="font-medium">Valor: </span>
            {valueFormatter(payload[0].value)}
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
          <RechartsLineChart 
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="opacity-30" 
                stroke="hsl(var(--border))"
              />
            )}
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
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color}
              strokeWidth={2}
              dot={showDots ? { 
                fill: color, 
                strokeWidth: 2, 
                r: 4,
                className: "drop-shadow-sm"
              } : false}
              activeDot={{ 
                r: 6, 
                stroke: color, 
                strokeWidth: 2,
                fill: "hsl(var(--background))",
                className: "drop-shadow-md"
              }}
              className="hover:opacity-80 transition-opacity"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

LineChart.displayName = "LineChart";

export default LineChart;