import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PageHeader({ title, description, icon, className, children }: PageHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-center gap-3", className)}>
      {icon && React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="ml-auto flex items-center gap-4">{children}</div>
    </div>
  );
}
