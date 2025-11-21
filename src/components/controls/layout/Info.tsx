"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlsContext } from "../context";
import { ControlsInfoProps } from "../types";

export function Info({ text }: ControlsInfoProps) {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  return (
    <div
      className={cn(
        "flex w-full items-center border-t py-2",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <p
        style={indentStyle}
        className="text-xs text-slate-500 dark:text-zinc-400"
      >
        {text}
      </p>
    </div>
  );
}
