"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { ControlsContext, useControlsContext } from "../context";
import { ControlsFolderProps } from "../types";
import { controlGroupColors } from "../constants";

export function Folder({
  title = "Controls Folder",
  children,
  initiallyOpen = false,
}: ControlsFolderProps) {
  const { depth } = useControlsContext();
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div className={cn("border-t border-slate-200 dark:border-zinc-800")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={indentStyle}
        className={cn(
          "group flex h-7 w-full flex-row items-center justify-between pr-2 transition-colors",
          "hover:bg-slate-100 dark:hover:bg-zinc-800/50",
          isOpen && "bg-slate-100 dark:bg-zinc-800"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <div
            className={cn("min-w-1 self-stretch", controlGroupColors.FOLDER)}
          />
          <span
            className={cn(
              "select-none text-xs font-bold transition-colors truncate",
              "text-slate-500 group-hover:text-slate-900",
              "dark:text-zinc-400 dark:group-hover:text-zinc-100",
              isOpen && "text-slate-900 dark:text-zinc-100"
            )}
          >
            {title}
          </span>
        </div>
        <IconChevronRight
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", !isOpen && "invisible")}>
          <ControlsContext.Provider value={{ depth: depth + 1, isRoot: false }}>
            {children}
          </ControlsContext.Provider>
        </div>
      </div>
    </div>
  );
}
