"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsTextAreaProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
} from "../styles";

export function TextArea({
  title = "Text Area",
  id,
  initialValue,
  rows = 3,
  disabled = false,
}: ControlsTextAreaProps) {
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
      className={cn(
        rowContainerStyles,
        "h-auto items-start",
        disabled && "opacity-50"
      )}
    >
      <div className={cn(gutterStyles, controlGroupColors.TEXT)} />
      <div className="flex w-full flex-col gap-1.5 px-2 py-1.5">
        <span className={cn(labelStyles)}>{title}</span>
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          rows={rows}
          disabled={disabled}
          className={cn(inputBaseStyles, "h-auto w-full resize-y p-1.5")}
        />
      </div>
    </div>
  );
}
