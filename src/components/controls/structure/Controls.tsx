"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { ControlsContext } from "../context";
import { ControlsProps } from "../types";
import { Alert } from "../layout/Alert";
import { Separator } from "../layout/Separator";

export function Controls({
  title = "Controls",
  children,
  initiallyOpen = false,
}: ControlsProps) {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  const parentContext = React.useContext(ControlsContext);
  React.useEffect(() => {
    if (parentContext) {
      throw new Error("<Controls> component cannot be nested inside another.");
    }
  }, [parentContext]);
  return (
    <ControlsContext.Provider value={{ depth: 1, isRoot: true }}>
      <div
        className={cn(
          "absolute top-4 right-4 w-72 z-50 overflow-hidden rounded-sm border",
          "bg-white text-slate-900 border-slate-200",
          "dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
          "transition-shadow duration-200 ease-out",
          isOpen && "shadow-xl dark:shadow-zinc-200/10"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex h-7 w-full flex-row items-center justify-between transition-colors",
            "hover:bg-slate-100 dark:hover:bg-zinc-800/50",
            "active:bg-slate-200 dark:active:bg-zinc-800",
            isOpen && "bg-slate-100 dark:bg-zinc-800"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div
              className={cn(
                "min-w-1 self-stretch",
                "bg-slate-900 dark:bg-white"
              )}
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
              "mr-2 size-3.5 transition-transform duration-200",
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
          <div
            className={cn(
              "overflow-hidden",
              "bg-white dark:bg-zinc-900",
              !isOpen && "invisible"
            )}
          >
            <div className="max-h-[60vh] overflow-y-auto">
              <Alert text="This menu is still a work in progress" />
              <Separator />
              {children}
            </div>
          </div>
        </div>
      </div>
    </ControlsContext.Provider>
  );
}
