"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsNumberProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  numberInputStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Number({
  title = "Number",
  id,
  initialValue,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsNumberProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;

  const clamp = (num: number) => {
    let clamped = num;
    if (min !== undefined) clamped = Math.max(clamped, min);
    if (max !== undefined) clamped = Math.min(clamped, max);
    return clamped;
  };

  const handleChange = (newValue: number | string) => {
    const numericValue =
      typeof newValue === "string" ? parseFloat(newValue) : newValue;
    if (!isNaN(numericValue)) {
      updateControl(id, numericValue);
    } else {
      updateControl(id, min !== undefined ? min : 0);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(e.target.value);
    if (!isNaN(numericValue)) {
      updateControl(id, clamp(numericValue));
    }
  };

  const handleStep = (direction: "up" | "down") => {
    const newValue = value + (direction === "up" ? step : -step);
    updateControl(id, clamp(newValue));
  };

  const buttonClasses = cn(
    "flex h-6 w-6 items-center justify-center transition-colors",
    "bg-slate-200 text-slate-600",
    "dark:bg-zinc-800 dark:text-zinc-400",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "hover:enabled:bg-slate-300 dark:hover:enabled:bg-zinc-700"
  );

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.NUMBER)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>

        <div className="flex items-center">
          <button
            onClick={() => handleStep("down")}
            disabled={disabled || (min !== undefined && value <= min)}
            className={cn(buttonClasses, "rounded-l-sm")}
            aria-label="Decrement"
          >
            <IconChevronDown size={14} stroke={2.5} />
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              inputBaseStyles,
              numberInputStyles,
              "w-16 text-center rounded-none border-x-0 !h-6"
            )}
          />
          <button
            onClick={() => handleStep("up")}
            disabled={disabled || (max !== undefined && value >= max)}
            className={cn(buttonClasses, "rounded-r-sm")}
            aria-label="Increment"
          >
            <IconChevronUp size={14} stroke={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
