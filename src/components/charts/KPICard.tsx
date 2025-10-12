import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  icon?: React.ReactNode;
  description?: string;
  format?: "currency" | "percentage" | "number";
  className?: string;
}

const KPICard = React.memo(({
  title,
  value,
  previousValue,
  icon,
  description,
  format = "number",
  className
}: KPICardProps) => {
  const formatValue = useMemo(() => {
    return (val: string | number) => {
      if (typeof val === "string") return val;
      
      switch (format) {
        case "currency":
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(val);
        case "percentage":
          return `${val.toFixed(1)}%`;
        default:
          return new Intl.NumberFormat("pt-BR").format(val);
      }
    };
  }, [format]);

  const variation = useMemo(() => {
    if (!previousValue || typeof value === "string") return null;
    
    const currentValue = typeof value === "number" ? value : parseFloat(value.toString());
    const variation = ((currentValue - previousValue) / previousValue) * 100;
    
    return {
      percentage: Math.abs(variation),
      isPositive: variation > 0,
      isNeutral: Math.abs(variation) < 0.1
    };
  }, [value, previousValue]);

  const getTrendIcon = () => {
    if (!variation) return null;
    
    if (variation.isNeutral) {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
    
    return variation.isPositive ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getVariationColor = () => {
    if (!variation) return "text-muted-foreground";
    
    if (variation.isNeutral) return "text-muted-foreground";
    return variation.isPositive ? "text-green-600" : "text-red-600";
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </CardTitle>
          {icon && (
            <div className="text-muted-foreground flex-shrink-0">
              {icon}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-xl sm:text-2xl font-bold break-words">
            {formatValue(value)}
          </div>
          {variation && (
            <div className={cn("flex items-center text-xs flex-wrap gap-1", getVariationColor())}>
              {getTrendIcon()}
              <span className="break-words">
                {variation.percentage.toFixed(1)}% em relação ao período anterior
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground break-words">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

KPICard.displayName = "KPICard";

export default KPICard;