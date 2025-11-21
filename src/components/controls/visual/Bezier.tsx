"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsBezierProps } from "../types";
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
        const height = width * (3 / 4);
        setSize({ width, height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

const clamp = (val: number) => Math.max(0, Math.min(1, val));

export function Bezier({
  title = "Bezier Curve",
  id,
  initialValue,
  disabled = false,
}: ControlsBezierProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const { ref: containerRef, width, height } = useElementSize();
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [draggingHandle, setDraggingHandle] = React.useState<
    "p1" | "p2" | null
  >(null);

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value: [number, number, number, number] =
    controlsState[id] ?? initialValue;
  const [p1x, p1y, p2x, p2y] = value;

  const handleDragStart = (handle: "p1" | "p2") => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDraggingHandle(handle);
  };

  const handleDrag = React.useCallback(
    (e: MouseEvent) => {
      if (!draggingHandle || !svgRef.current) return;
      e.preventDefault();

      const svgBounds = svgRef.current.getBoundingClientRect();
      const x = clamp((e.clientX - svgBounds.left) / svgBounds.width);
      const y = clamp(1 - (e.clientY - svgBounds.top) / svgBounds.height);

      const newPoints: [number, number, number, number] = [...value];
      if (draggingHandle === "p1") {
        newPoints[0] = x;
        newPoints[1] = y;
      } else {
        newPoints[2] = x;
        newPoints[3] = y;
      }
      updateControl(id, newPoints);
    },
    [draggingHandle, updateControl, id, value]
  );

  const handleDragEnd = React.useCallback(() => {
    setDraggingHandle(null);
  }, []);

  React.useEffect(() => {
    if (draggingHandle) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [draggingHandle, handleDrag, handleDragEnd]);

  const p1_svg = { x: p1x * width, y: (1 - p1y) * height };
  const p2_svg = { x: p2x * width, y: (1 - p2y) * height };

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
      <div
        ref={containerRef}
        className="flex w-full flex-col gap-2 px-2 py-1.5"
      >
        <span className={cn(labelStyles)}>{title}</span>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          style={{ height: height > 0 ? `${height}px` : undefined }}
          className="w-full cursor-pointer rounded-sm bg-slate-100 dark:bg-zinc-800"
        >
          {width > 0 && (
            <>
              <path
                d={`M ${width * 0.25} 0 V ${height} M ${
                  width * 0.5
                } 0 V ${height} M ${width * 0.75} 0 V ${height} M 0 ${
                  height * 0.25
                } H ${width} M 0 ${height * 0.5} H ${width} M 0 ${
                  height * 0.75
                } H ${width}`}
                className="stroke-slate-200 dark:stroke-zinc-700"
                strokeWidth="0.5"
              />
              <line
                x1={0}
                y1={height}
                x2={p1_svg.x}
                y2={p1_svg.y}
                className="stroke-slate-400 dark:stroke-zinc-500"
                strokeWidth="1"
              />
              <line
                x1={width}
                y1={0}
                x2={p2_svg.x}
                y2={p2_svg.y}
                className="stroke-slate-400 dark:stroke-zinc-500"
                strokeWidth="1"
              />
              <path
                d={`M 0,${height} C ${p1_svg.x},${p1_svg.y} ${p2_svg.x},${p2_svg.y} ${width},0`}
                className="stroke-pink-500 dark:stroke-pink-400"
                strokeWidth="2"
                fill="none"
              />
              <circle
                onMouseDown={handleDragStart("p1")}
                cx={p1_svg.x}
                cy={p1_svg.y}
                r="5"
                className="fill-white stroke-2 stroke-pink-500 dark:fill-zinc-900 dark:stroke-pink-400"
              />
              <circle
                onMouseDown={handleDragStart("p2")}
                cx={p2_svg.x}
                cy={p2_svg.y}
                r="5"
                className="fill-white stroke-2 stroke-pink-500 dark:fill-zinc-900 dark:stroke-pink-400"
              />
            </>
          )}
        </svg>
        <div className="rounded-sm bg-slate-100 p-2 font-mono text-xs text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
          <code className="select-all">{`cubic-bezier(${p1x.toFixed(
            2
          )}, ${p1y.toFixed(2)}, ${p2x.toFixed(2)}, ${p2y.toFixed(2)})`}</code>
        </div>
      </div>
    </div>
  );
}
