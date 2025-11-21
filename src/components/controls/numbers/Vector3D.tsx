"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsVector3DProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  numberInputStyles,
  rowContainerStyles,
} from "../styles";

export function Vector3D({
  title = "Vector3D",
  id,
  initialValue,
  step = 0.1,
  disabled = false,
}: ControlsVector3DProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;

  const normalizedValue = Array.isArray(value)
    ? { x: value[0], y: value[1], z: value[2] }
    : value;

  const handleChange = (axis: "x" | "y" | "z", newValue: number) => {
    const updatedValue = { ...normalizedValue, [axis]: newValue };
    const finalValue = Array.isArray(value)
      ? [updatedValue.x, updatedValue.y, updatedValue.z]
      : updatedValue;
    updateControl(id, finalValue);
  };

  const AxisInput = ({ axis, val }: { axis: "x" | "y" | "z"; val: number }) => (
    <div className="flex w-full items-center gap-1">
      <label
        htmlFor={`${id}-${axis}`}
        className="w-4 text-center font-mono text-xs text-slate-400 dark:text-zinc-500"
      >
        {axis.toUpperCase()}
      </label>
      <input
        id={`${id}-${axis}`}
        type="number"
        value={val}
        step={step}
        onChange={(e) => handleChange(axis, e.target.valueAsNumber || 0)}
        disabled={disabled}
        className={cn(
          inputBaseStyles,
          numberInputStyles,
          "w-full text-right !h-6"
        )}
      />
    </div>
  );

  return (
    <div
      style={indentStyle}
      className={cn(
        rowContainerStyles,
        "h-auto items-start",
        disabled && "opacity-50"
      )}
    >
      <div className={cn(gutterStyles, controlGroupColors.NUMBER)} />
      <div className="flex w-full flex-col gap-1.5 px-2 py-1.5">
        <span className={cn(labelStyles)}>{title}</span>
        <div className="grid grid-cols-3 gap-1.5">
          <AxisInput axis="x" val={normalizedValue.x} />
          <AxisInput axis="y" val={normalizedValue.y} />
          <AxisInput axis="z" val={normalizedValue.z} />
        </div>
      </div>
    </div>
  );
}
