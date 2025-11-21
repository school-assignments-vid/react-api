"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsMonitorProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Monitor({ title = "Monitor", id }: ControlsMonitorProps) {
  const { controlsState } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const isDefined = Object.prototype.hasOwnProperty.call(controlsState, id);
  const rawValue = isDefined ? controlsState[id] : undefined;

  const formatValue = (val: unknown): string => {
    if (val === undefined || val === null) {
      return "N/A";
    }
    if (typeof val === "number") {
      return parseFloat(val.toFixed(3)).toString();
    }
    if (typeof val === "boolean") {
      return val ? "true" : "false";
    }
    return String(val);
  };

  const getValueStyles = (val: unknown): string => {
    const type = typeof val;
    switch (type) {
      case "number":
        return "text-sky-600 dark:text-sky-400";
      case "boolean":
        return "text-fuchsia-600 dark:text-fuchsia-400";
      case "string":
        return "text-indigo-600 dark:text-indigo-400";
      default:
        return "text-slate-500 dark:text-zinc-500";
    }
  };

  const valueToDisplay = formatValue(rawValue);
  const typeStyles = getValueStyles(rawValue);

  return (
    <div style={indentStyle} className={cn(rowContainerStyles)}>
      <div className={cn(gutterStyles, controlGroupColors.MONITOR)} />
      <div className={cn(rowContentContainerStyles)}>
        <span
          className={cn(
            labelStyles,
            "group-hover:text-slate-500 dark:group-hover:text-zinc-400"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "h-5 min-w-[3rem] select-all rounded-sm bg-slate-100 px-1.5 flex items-center justify-end font-mono text-xs",
            "dark:bg-zinc-800",
            typeStyles
          )}
        >
          {valueToDisplay}
        </span>
      </div>
    </div>
  );
}
