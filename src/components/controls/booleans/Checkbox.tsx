"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsCheckboxProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, labelStyles, rowContainerStyles } from "../styles";

export function Checkbox({
  title = "Checkbox",
  id,
  initialValue,
  disabled = false,
}: ControlsCheckboxProps) {
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
            "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors",
            "border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
            "peer-focus:ring-2 peer-focus:ring-sky-500 dark:peer-focus:ring-sky-400",
            value &&
              "border-lime-500 bg-lime-500 dark:bg-zinc-200 dark:border-zinc-200"
          )}
        >
          {value && (
            <IconCheck
              stroke={3}
              className={cn("h-3 w-3 text-white dark:text-zinc-900")}
            />
          )}
        </div>
      </label>
    </div>
  );
}
