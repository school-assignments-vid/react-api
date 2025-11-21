import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "./slot";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-muted border rounded-2xl text-foreground flex flex-col overflow-hidden",
        "has-data-[slot='card-content']:**:data-[slot='card-header']:border-none",
        "has-data-[slot='card-content']:**:data-[slot='card-header']:rounded-none",
        "has-data-[slot='card-content']:**:data-[slot='card-header']:pb-0",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 p-4 bg-background",
        "rounded-b-2xl border-b",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="card-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "rounded-b-2xl border-b p-4 bg-background flex-1",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-footer"
      className={cn(
        "mt-1 text-muted-foreground flex items-center px-4 py-2 text-sm",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
