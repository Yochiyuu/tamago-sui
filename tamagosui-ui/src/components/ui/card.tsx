import * as React from "react";
import { cn } from "@/lib/utils";

// Komponen Card
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-black/20 backdrop-blur-sm rounded-2xl border border-blue-500/50 " +
          "shadow-lg shadow-blue-500/20 relative overflow-hidden " +
          "transition-all duration-300 hover:shadow-blue-400/40",
        className
      )}
      {...props}
    />
  );
}

// Komponen CardHeader
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 " +
          "has-data-[slot=card-action]:grid-cols-[1fr_auto] " +
          "border-b border-blue-500/30 pb-4",
        className
      )}
      {...props}
    />
  );
}

// Komponen CardTitle
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h2
      data-slot="card-title"
      className={cn(
        "text-2xl font-bold tracking-tight text-white drop-shadow-md",
        className
      )}
      {...props}
    />
  );
}

// Komponen CardDescription
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-gray-300", className)}
      {...props}
    />
  );
}

// Komponen CardAction
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

// Komponen CardContent
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-0 text-white", className)}
      {...props}
    />
  );
}

// Komponen CardFooter
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-0 border-t border-blue-500/30 pt-4",
        className
      )}
      {...props}
    />
  );
}

// Ekspor semua komponen
export {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardAction,
  CardDescription,
  CardContent,
};
