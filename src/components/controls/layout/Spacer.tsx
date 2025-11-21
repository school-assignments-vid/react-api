"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ControlsSpacerProps } from "../types";

export function Spacer({ size = "md" }: ControlsSpacerProps) {
  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  }[size];

  return (
    <div
      className={cn(
        "w-full border-t border-slate-200 dark:border-zinc-800",
        heightClass
      )}
    />
  );
}
