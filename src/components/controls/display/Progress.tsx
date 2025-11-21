"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsProgressProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Progress({
  title = "Progress",
  id,
  min = 0,
  max = 100,
}: ControlsProgressProps) {
  const { controlsState } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const rawValue = controlsState[id] ?? 0;
  const value = Math.max(min, Math.min(rawValue, max));
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div style={indentStyle} className={cn(rowContainerStyles)}>
      <div className={cn(gutterStyles, controlGroupColors.DISPLAY)} />
      <div className={cn(rowContentContainerStyles)}>
        <span
          className={cn(
            labelStyles,
            "group-hover:text-slate-500 dark:group-hover:text-zinc-400"
          )}
        >
          {title}
        </span>
        <div className="flex h-5 w-40 items-center gap-2">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-cyan-400 transition-[width] duration-150"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-xs text-slate-500 dark:text-zinc-400">
            {value.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
