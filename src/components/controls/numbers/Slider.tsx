"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsSliderProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  numberInputStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Slider({
  title = "Slider",
  id,
  initialValue,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsSliderProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    if (parseFloat(inputValue) !== value) {
      setInputValue(value.toString());
    }
  }, [inputValue, value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateControl(id, parseFloat(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputCommit = () => {
    let num = parseFloat(inputValue);
    if (!isNaN(num)) {
      num = Math.max(min, Math.min(max, num));
      updateControl(id, num);
      setInputValue(num.toString());
    } else {
      setInputValue(value.toString());
    }
  };

  const range = max - min;
  const percentage = range > 0 ? ((value - min) / range) * 100 : 0;
  const trackStyle = {
    background: `linear-gradient(to right, var(--slider-accent-color) ${percentage}%, var(--slider-fill-color) ${percentage}%)`,
  };

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.NUMBER)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputCommit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputCommit();
                e.currentTarget.blur();
              }
            }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              inputBaseStyles,
              numberInputStyles,
              "w-16 text-right"
            )}
          />

          <input
            type="range"
            value={value}
            onChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            style={trackStyle}
            className={cn(
              "h-1.5 w-24 cursor-pointer appearance-none rounded-full outline-none",
              "[--slider-accent-color:theme(colors.sky.400)]",
              "[--slider-fill-color:theme(colors.slate.200)] dark:[--slider-fill-color:theme(colors.zinc.700)]",
              "disabled:cursor-not-allowed",
              "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow",
              "[&::-webkit-slider-thumb]:bg-slate-800 dark:[&::-webkit-slider-thumb]:bg-zinc-200",
              "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
              "[&::-moz-range-thumb]:bg-slate-800 dark:[&::-moz-range-thumb]:bg-zinc-200"
            )}
          />
        </div>
      </div>
    </div>
  );
}
