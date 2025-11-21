"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlsContext } from "../context";
import { ControlsButtonProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, rowContainerStyles } from "../styles";

export function Button({
  title = "Button",
  onClick,
  disabled = false,
}: ControlsButtonProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, "p-0", disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.ACTION)} />
      <div className="flex justify-center h-full w-full py-0.5 px-1">
        <button
          className={cn(
            "h-full w-full rounded-sm text-xs font-medium transition-colors",
            "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300",
            "dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white dark:active:bg-zinc-600",
            "disabled:cursor-not-allowed",
            "focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none"
          )}
          disabled={disabled}
          onClick={onClick}
        >
          {title}
        </button>
      </div>
    </div>
  );
}
