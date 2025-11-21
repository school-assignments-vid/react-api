"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCircle } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsRadioGroupProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, labelStyles, rowContainerStyles } from "../styles";

export function RadioGroup<T extends string | number>({
  title = "Radio Group",
  id,
  initialValue,
  options,
  disabled = false,
}: ControlsRadioGroupProps<T>) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: T) => updateControl(id, newValue);

  return (
    <div
      style={indentStyle}
      className={cn(
        rowContainerStyles,
        "h-auto items-start",
        disabled && "opacity-50"
      )}
    >
      <div className={cn(gutterStyles, controlGroupColors.RADIO)} />
      <div className="flex w-full flex-col gap-1.5 px-2 py-1.5">
        <span className={cn(labelStyles)}>{title}</span>
        <div className="flex flex-col gap-1.5">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2",
                  disabled && "cursor-not-allowed"
                )}
              >
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleChange(option.value)}
                  disabled={disabled}
                  className="sr-only peer"
                />
                <div
                  className={cn(
                    "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                    "border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
                    "peer-focus:ring-2 peer-focus:ring-sky-500 dark:peer-focus:ring-sky-400",
                    isSelected &&
                      "border-fuchsia-500 bg-fuchsia-500 dark:border-zinc-200 dark:bg-zinc-200"
                  )}
                >
                  {isSelected && (
                    <IconCircle
                      stroke={3}
                      className={cn(
                        "h-2 w-2 fill-white text-white dark:fill-zinc-900 dark:text-zinc-900"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "select-none text-xs",
                    "text-slate-600 dark:text-zinc-300"
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
