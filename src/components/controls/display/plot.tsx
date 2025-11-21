"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useControlState, useControlsContext } from "../context";
import { ControlsPlotProps } from "../types";
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
        const height = width / 3;
        setSize({ width, height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

export function Plot({
  title = "Plot",
  id,
  history: historyCount = 100,
  fill = true,
}: ControlsPlotProps) {
  const { controlsState } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const { ref: containerRef, width, height } = useElementSize();

  const currentValue = (controlsState[id] as number) ?? 0;

  const [history, setHistory] = React.useState<number[]>(() =>
    Array(historyCount).fill(0)
  );

  React.useEffect(() => {
    if (width > 0) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory, currentValue];
        return newHistory.slice(-historyCount);
      });
    }
  }, [currentValue, historyCount, width]);

  const generatePath = React.useCallback(() => {
    if (history.length < 2 || width === 0) {
      return `M 0,${height} L ${width},${height}`;
    }

    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min;

    const points = history
      .map((value, index) => {
        const x = (index / (history.length - 1)) * width;
        const y =
          height - (range > 0 ? ((value - min) / range) * height : height / 2);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" L ");

    const linePath = `M ${points}`;

    if (fill) {
      return `${linePath} L ${width},${height} L 0,${height} Z`;
    }

    return linePath;
  }, [history, width, height, fill]);

  const svgPath = generatePath();
  const latestValue = history.length > 0 ? history[history.length - 1] : 0;

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, "h-auto items-start")}
    >
      <div className={cn(gutterStyles, controlGroupColors.DISPLAY)} />
      <div
        ref={containerRef}
        className="flex w-full flex-col gap-1.5 px-2 py-1.5"
      >
        <div className="flex w-full items-center justify-between">
          <span
            className={cn(
              labelStyles,
              "group-hover:text-slate-500 dark:group-hover:text-zinc-400"
            )}
          >
            {title}
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
            {latestValue.toFixed(3)}
          </span>
        </div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ height: height > 0 ? `${height}px` : undefined }}
          className="w-full rounded-sm bg-slate-100 dark:bg-zinc-800"
        >
          {width > 0 && (
            <path
              d={svgPath}
              className={cn(
                "stroke-cyan-500 dark:stroke-cyan-400",
                fill
                  ? "fill-cyan-400/30 dark:fill-cyan-400/20"
                  : "fill-transparent"
              )}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
