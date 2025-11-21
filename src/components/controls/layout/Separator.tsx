"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlsContext } from "../context";

export function Separator() {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  return (
    <div
      className={cn(
        "flex h-4 w-full items-center border-t",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div style={indentStyle} className="w-full">
        <div className="h-px w-full bg-slate-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
