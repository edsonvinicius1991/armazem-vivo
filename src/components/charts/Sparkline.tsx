import React, { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SparklineData {
  value: number;
}

interface SparklineProps {
  data: SparklineData[];
  color?: string;
  height?: number;
  showTrend?: boolean;
  currentValue?: number;
  previousValue?: number;
  label?: string;
  format?: "currency" | "percentage" | "number";
  className?: string;
}

const Sparkline = React.memo(({
  data,
  color = "hsl(var(--primary))",
  height = 40,
  showTrend = true,
  currentValue,
  previousValue,
  label,
  format = "number",
  className
}: SparklineProps) => {
  const formatValue = useMemo(() => {
    return (value: number) => {
      switch (format) {
        case "currency":
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
            maximumFractionDigits: 1
          }).format(value);
        case "percentage":
          return `${value.toFixed(1)}%`;
        default:
          return new Intl.NumberFormat("pt-BR", {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(value);
      }
    };
  }, [format]);

  const trend = useMemo(() => {
    if (!showTrend) return null;
    
    if (!currentValue || !previousValue) {
      // Fallback: calcular tendência baseada nos primeiros e últimos valores dos dados
      if (data.length < 2) return null;
      
      const firstValue = data[0].value;
      const lastValue = data[data.length - 1].value;
      const variation = ((lastValue - firstValue) / firstValue) * 100;
      
      return {
        percentage: Math.abs(variation),
        isPositive: variation > 0,
        isNeutral: Math.abs(variation) < 0.1
      };
    }
    
    const variation = ((currentValue - previousValue) / previousValue) * 100;
    
    return {
      percentage: Math.abs(variation),
      isPositive: variation > 0,
      isNeutral: Math.abs(variation) < 0.1
    };
  }, [showTrend, currentValue, previousValue, data]);

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.isNeutral) {
      return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
    
    return trend.isPositive ? (
      <TrendingUp className="h-3 w-3 text-green-600" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-600" />
    );
  };

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    
    if (trend.isNeutral) return "text-muted-foreground";
    return trend.isPositive ? "text-green-600" : "text-red-600";
  };

  return (
    <div className={cn("flex items-center justify-between p-2 sm:p-3 border border-border rounded-lg transition-all duration-200 hover:shadow-sm", className)}>
      <div className="flex-1">
        {label && (
          <p className="text-xs text-muted-foreground mb-1 truncate">{label}</p>
        )}
        <div className="flex items-center gap-2">
          <div className="w-12 sm:w-16 h-6 sm:h-8 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data}
                margin={{ top: 1, right: 1, left: 1, bottom: 1 }}
              >
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color}
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                  className="drop-shadow-sm"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-semibold text-xs sm:text-sm">
              {currentValue !== undefined ? formatValue(currentValue) : formatValue(data[data.length - 1]?.value || 0)}
            </p>
            {trend && (
              <div className={cn("flex items-center gap-1 text-xs", getTrendColor())}>
                {getTrendIcon()}
                <span className="text-xs">{trend.percentage.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Sparkline.displayName = "Sparkline";

export default Sparkline;