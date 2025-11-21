"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsVector2DProps } from "../types";
import { controlGroupColors } from "../constants";
import { gutterStyles, labelStyles, rowContainerStyles } from "../styles";

function useElementSize() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        const height = width;
        setSize({ width, height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

export function Vector2D({
  title = "Vector2D",
  id,
  initialValue,
  disabled = false,
}: ControlsVector2DProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };
  const { ref: containerRef, width } = useElementSize();
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const normalizedValue = Array.isArray(value)
    ? { x: value[0], y: value[1] }
    : value;

  const handleDragStart = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.nativeEvent);
  };

  const updatePosition = React.useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const bounds = containerRef.current.getBoundingClientRect();
      const x = clamp((e.clientX - bounds.left) / bounds.width, 0, 1) * 2 - 1;
      const y = -(clamp((e.clientY - bounds.top) / bounds.height, 0, 1) * 2 - 1);
      const finalValue = Array.isArray(value) ? [x, y] : { x, y };
      updateControl(id, finalValue);
    },
    [containerRef, value, updateControl, id]
  );

  const handleDrag = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e);
    },
    [isDragging, updatePosition]
  );

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  const handleX = ((normalizedValue.x + 1) / 2) * width;
  const handleY = ((-normalizedValue.y + 1) / 2) * width;

  return (
    <div
      style={indentStyle}
      className={cn(
        rowContainerStyles,
        "h-auto items-start",
        disabled && "opacity-50"
      )}
    >
      <div className={cn(gutterStyles, controlGroupColors.VISUAL)} />
      <div className="flex w-full flex-col gap-2 px-2 py-1.5">
        <div className="flex justify-between items-center">
          <span className={cn(labelStyles)}>{title}</span>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
            [{normalizedValue.x.toFixed(2)}, {normalizedValue.y.toFixed(2)}]
          </span>
        </div>
        <div ref={containerRef} className="w-full">
          <svg
            viewBox={`0 0 ${width} ${width}`}
            style={{ height: width > 0 ? `${width}px` : undefined }}
            className="w-full cursor-pointer rounded-sm bg-slate-100 dark:bg-zinc-800"
            onMouseDown={handleDragStart}
          >
            {width > 0 && (
              <>
                <path
                  d={`M ${width / 2} 0 V ${width} M 0 ${width / 2} H ${width}`}
                  className="stroke-slate-200 dark:stroke-zinc-700"
                  strokeWidth="1"
                />
                <line
                  x1={width / 2}
                  y1={width / 2}
                  x2={handleX}
                  y2={handleY}
                  className="stroke-pink-500/50 dark:stroke-pink-400/50"
                  strokeWidth="1"
                />
                <circle
                  cx={handleX}
                  cy={handleY}
                  r="5"
                  className="fill-white stroke-2 stroke-pink-500 dark:fill-zinc-900 dark:stroke-pink-400"
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
