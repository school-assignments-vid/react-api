"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsTextProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Text({
  title = "Text",
  id,
  initialValue,
  disabled = false,
}: ControlsTextProps) {
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
      <div className={cn(gutterStyles, controlGroupColors.TEXT)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className={cn(inputBaseStyles, "w-36 text-right")}
        />
      </div>
    </div>
  );
}
