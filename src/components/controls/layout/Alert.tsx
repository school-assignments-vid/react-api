"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useControlsContext } from "../context";
import { ControlsAlertProps } from "../types";

export function Alert({
  text,
  variant = "info",
  show = true,
}: ControlsAlertProps) {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  const variantStyles = {
    info: {
      container: "bg-sky-100 dark:bg-sky-500/20",
      icon: IconInfoCircle,
      iconColor: "text-sky-600 dark:text-sky-400",
      textColor: "text-sky-800 dark:text-sky-300",
    },
    success: {
      container: "bg-emerald-100 dark:bg-emerald-500/20",
      icon: IconCircleCheck,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      textColor: "text-emerald-800 dark:text-emerald-300",
    },
    warning: {
      container: "bg-amber-100 dark:bg-amber-500/20",
      icon: IconAlertTriangle,
      iconColor: "text-amber-600 dark:text-amber-400",
      textColor: "text-amber-800 dark:text-amber-300",
    },
    error: {
      container: "bg-rose-100 dark:bg-rose-500/20",
      icon: IconAlertCircle,
      iconColor: "text-rose-600 dark:text-rose-400",
      textColor: "text-rose-800 dark:text-rose-300",
    },
  };

  if (!show) {
    return null;
  }

  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div
      className={cn(
        "w-full border-t border-slate-200 dark:border-zinc-800 py-2"
      )}
    >
      <div style={indentStyle}>
        <div
          className={cn(
            "flex items-start gap-2 rounded-sm p-2",
            styles.container
          )}
        >
          <IconComponent
            className={cn("mt-px h-4 w-4 flex-shrink-0", styles.iconColor)}
          />
          <p className={cn("text-xs", styles.textColor)}>{text}</p>
        </div>
      </div>
    </div>
  );
}
