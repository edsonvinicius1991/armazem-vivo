import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  spacing?: "none" | "sm" | "md" | "lg";
}

const ResponsiveContainer = React.forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  ({ 
    className, 
    children, 
    maxWidth = "full", 
    padding = "md", 
    spacing = "md",
    ...props 
  }, ref) => {
    const isMobile = useIsMobile();

    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full"
    };

    const paddingClasses = {
      none: "",
      sm: isMobile ? "px-2 py-2" : "px-4 py-4",
      md: isMobile ? "px-4 py-4" : "px-6 py-6", 
      lg: isMobile ? "px-4 py-6" : "px-8 py-8"
    };

    const spacingClasses = {
      none: "",
      sm: "space-y-2",
      md: isMobile ? "space-y-4" : "space-y-6",
      lg: isMobile ? "space-y-6" : "space-y-8"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          maxWidthClasses[maxWidth],
          paddingClasses[padding],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ResponsiveContainer.displayName = "ResponsiveContainer";

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "sm" | "md" | "lg";
}

const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ 
    className, 
    children, 
    cols = { default: 1, md: 2, lg: 3 },
    gap = "md",
    ...props 
  }, ref) => {
    const isMobile = useIsMobile();

    const gapClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: isMobile ? "gap-3" : "gap-4",
      lg: isMobile ? "gap-4" : "gap-6"
    };

    const gridColsClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2", 
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6"
    };

    const responsiveClasses = [
      gridColsClasses[cols.default],
      cols.sm && `sm:${gridColsClasses[cols.sm]}`,
      cols.md && `md:${gridColsClasses[cols.md]}`,
      cols.lg && `lg:${gridColsClasses[cols.lg]}`,
      cols.xl && `xl:${gridColsClasses[cols.xl]}`
    ].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          responsiveClasses,
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ResponsiveGrid.displayName = "ResponsiveGrid";

interface ResponsiveFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  mobileDirection?: "row" | "col" | "row-reverse" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: "none" | "sm" | "md" | "lg";
  wrap?: boolean;
}

const ResponsiveFlex = React.forwardRef<HTMLDivElement, ResponsiveFlexProps>(
  ({ 
    className, 
    children, 
    direction = "row",
    mobileDirection,
    justify = "start",
    align = "start",
    gap = "md",
    wrap = false,
    ...props 
  }, ref) => {
    const isMobile = useIsMobile();

    const directionClasses = {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse"
    };

    const justifyClasses = {
      start: "justify-start",
      end: "justify-end", 
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    };

    const alignClasses = {
      start: "items-start",
      end: "items-end",
      center: "items-center", 
      baseline: "items-baseline",
      stretch: "items-stretch"
    };

    const gapClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: isMobile ? "gap-3" : "gap-4",
      lg: isMobile ? "gap-4" : "gap-6"
    };

    const currentDirection = isMobile && mobileDirection ? mobileDirection : direction;

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[currentDirection],
          justifyClasses[justify],
          alignClasses[align],
          gapClasses[gap],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ResponsiveFlex.displayName = "ResponsiveFlex";

export {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveFlex,
};