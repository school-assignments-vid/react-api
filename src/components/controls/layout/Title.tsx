"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlsContext } from "../context";
import { ControlsTitleProps } from "../types";

export function Title({ title = "Section Title" }: ControlsTitleProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "flex h-7 w-full items-center border-t pt-1",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div className="flex w-full items-center px-2">
        <span
          className={cn(
            "select-none text-xs font-bold uppercase tracking-wider truncate",
            "text-slate-400 dark:text-zinc-500"
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
