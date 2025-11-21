"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsColorProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Color({
  title = "Color",
  id,
  initialValue,
  disabled = false,
}: ControlsColorProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: string) => updateControl(id, newValue);

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.COLOR)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "relative h-5 w-5 rounded-sm border",
              "border-slate-300 dark:border-zinc-600"
            )}
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className={cn(
              inputBaseStyles,
              "w-20 font-mono text-right uppercase"
            )}
          />
        </div>
      </div>
    </div>
  );
}
