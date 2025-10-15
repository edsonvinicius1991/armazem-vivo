import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  minWidth?: string;
  showScrollIndicator?: boolean;
}

const ResponsiveTable = React.forwardRef<HTMLDivElement, ResponsiveTableProps>(
  ({ className, children, minWidth = "600px", showScrollIndicator = true, ...props }, ref) => {
    const isMobile = useIsMobile();

    if (isMobile) {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <ScrollArea className="w-full">
            <div 
              className="relative"
              style={{ minWidth }}
            >
              {showScrollIndicator && (
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10 flex items-center justify-center">
                  <div className="w-1 h-8 bg-muted-foreground/30 rounded-full" />
                </div>
              )}
              {children}
            </div>
          </ScrollArea>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative w-full overflow-auto", className)} {...props}>
        {children}
      </div>
    );
  }
);
ResponsiveTable.displayName = "ResponsiveTable";

interface ResponsiveTableCardProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveTableCard = ({ children, className }: ResponsiveTableCardProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Card className={cn("mb-3", className)}>
        <CardContent className="p-4">
          {children}
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

interface ResponsiveTableRowProps {
  children: React.ReactNode;
  className?: string;
  mobileLayout?: React.ReactNode;
}

const ResponsiveTableRow = ({ children, className, mobileLayout }: ResponsiveTableRowProps) => {
  const isMobile = useIsMobile();

  if (isMobile && mobileLayout) {
    return <ResponsiveTableCard className={className}>{mobileLayout}</ResponsiveTableCard>;
  }

  return (
    <tr className={cn("border-b transition-colors hover:bg-muted/50", className)}>
      {children}
    </tr>
  );
};

interface ResponsiveTableHeaderProps {
  children: React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

const ResponsiveTableHeader = ({ children, className, hideOnMobile = false }: ResponsiveTableHeaderProps) => {
  const isMobile = useIsMobile();

  if (isMobile && hideOnMobile) {
    return null;
  }

  return (
    <thead className={cn("[&_tr]:border-b", className)}>
      {children}
    </thead>
  );
};

interface ResponsiveTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  hideOnMobile?: boolean;
  mobileLabel?: string;
  children: React.ReactNode;
}

const ResponsiveTableCell = React.forwardRef<HTMLTableCellElement, ResponsiveTableCellProps>(
  ({ className, hideOnMobile = false, mobileLabel, children, ...props }, ref) => {
    const isMobile = useIsMobile();

    if (isMobile && hideOnMobile) {
      return null;
    }

    return (
      <td 
        ref={ref} 
        className={cn(
          "p-4 align-middle [&:has([role=checkbox])]:pr-0",
          isMobile && mobileLabel && "flex justify-between items-center py-2 px-0 border-b-0",
          className
        )} 
        {...props}
      >
        {isMobile && mobileLabel && (
          <span className="font-medium text-muted-foreground text-sm">{mobileLabel}:</span>
        )}
        <div className={isMobile && mobileLabel ? "text-right" : ""}>
          {children}
        </div>
      </td>
    );
  }
);
ResponsiveTableCell.displayName = "ResponsiveTableCell";

export {
  ResponsiveTable,
  ResponsiveTableCard,
  ResponsiveTableRow,
  ResponsiveTableHeader,
  ResponsiveTableCell,
};