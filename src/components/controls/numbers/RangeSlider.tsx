"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsRangeSliderProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, labelStyles, rowContainerStyles } from "../styles";

export function RangeSlider({
  title = "Range Slider",
  id,
  initialValue,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsRangeSliderProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: { min: number; max: number }) =>
    updateControl(id, newValue);

  const range = max - min;
  const minPos = range > 0 ? ((value.min - min) / range) * 100 : 0;
  const maxPos = range > 0 ? ((value.max - min) / range) * 100 : 0;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseFloat(e.target.value), value.max - step);
    handleChange({ ...value, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseFloat(e.target.value), value.min + step);
    handleChange({ ...value, max: newMax });
  };

  const sharedInputClasses = cn(
    "pointer-events-none absolute h-full w-full appearance-none bg-transparent outline-none",
    "disabled:cursor-not-allowed",
    "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow",
    "[&::-webkit-slider-thumb]:bg-slate-800 dark:[&::-webkit-slider-thumb]:bg-zinc-200",
    "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
    "[&::-moz-range-thumb]:bg-slate-800 dark:[&::-moz-range-thumb]:bg-zinc-200",
    "[&::-webkit-slider-thumb]:pointer-events-auto",
    "[&::-moz-range-thumb]:pointer-events-auto"
  );

  return (
    <div
      style={indentStyle}
      className={cn(
        rowContainerStyles,
        "h-12 flex-col items-start",
        disabled && "opacity-50"
      )}
    >
      <div className="flex w-full items-center">
        <div className={cn(gutterStyles, controlGroupColors.NUMBER)} />
        <div className="flex w-full flex-col gap-1 px-2 py-1.5">
          <div className="flex w-full items-center justify-between">
            <span className={cn(labelStyles)}>{title}</span>
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
              {`${value.min.toFixed(1)} - ${value.max.toFixed(1)}`}
            </span>
          </div>
          <div className="relative h-4 w-full">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-200 dark:bg-zinc-700" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-sky-400"
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value.min}
              onChange={handleMinChange}
              disabled={disabled}
              className={sharedInputClasses}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value.max}
              onChange={handleMaxChange}
              disabled={disabled}
              className={sharedInputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
