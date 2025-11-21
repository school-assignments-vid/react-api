"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsToggleProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, labelStyles, rowContainerStyles } from "../styles";

export function Toggle({
  title = "Toggle",
  id,
  initialValue,
  disabled = false,
}: ControlsToggleProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: boolean) => updateControl(id, newValue);

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.BOOLEAN)} />
      <label
        className={cn(
          "flex w-full flex-row items-center justify-between px-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <span className={cn(labelStyles)}>{title}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={() => handleChange(!value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "relative flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors",
            "bg-slate-200 dark:bg-zinc-700",
            "peer-focus:ring-2 peer-focus:ring-sky-500 dark:peer-focus:ring-sky-400",
            value && "bg-lime-500 dark:bg-zinc-200"
          )}
        >
          <span
            className={cn(
              "absolute h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-out",
              value ? "right-1 dark:bg-zinc-800" : "left-1 dark:bg-zinc-200"
            )}
          />
        </div>
      </label>
    </div>
  );
}
