"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  IconChevronRight,
  IconTablePlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  ControlsContext,
  useControlState,
  useControlsContext,
} from "../context";
import { ControlsColorArrayProps } from "../types";
import { controlGroupColors } from "../constants";
import { inputBaseStyles, rowContainerStyles } from "../styles";

export function ColorArray({
  title = "Color Array",
  id,
  initialValue,
  newItemValue = "#000000",
  initiallyOpen = false,
  disabled = false,
}: ControlsColorArrayProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value: string[] = controlsState[id] ?? initialValue;

  const handleAddItem = () => {
    if (disabled) return;
    updateControl(id, [...value, newItemValue]);
  };

  const handleRemoveItem = (index: number) => {
    if (disabled) return;
    updateControl(
      id,
      value.filter((_, i) => i !== index)
    );
  };

  const handleItemChange = (index: number, newValue: string) => {
    if (disabled) return;
    const newArray = [...value];
    newArray[index] = newValue;
    updateControl(id, newArray);
  };

  return (
    <div
      className={cn(
        "border-t border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={indentStyle}
        className={cn(
          "group flex h-7 w-full flex-row items-center justify-between pr-2 transition-colors",
          !disabled && "hover:bg-slate-100 dark:hover:bg-zinc-800/50",
          isOpen && !disabled && "bg-slate-100 dark:bg-zinc-800"
        )}
        disabled={disabled}
      >
        <div className="flex flex-row items-center gap-2">
          <div
            className={cn(
              "min-w-1 self-stretch",
              controlGroupColors.COMPLEX,
              !isOpen && "opacity-80"
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
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400 dark:text-zinc-500">
            [{value.length}]
          </span>
          <IconChevronRight
            className={cn(
              "size-3.5 transition-transform",
              isOpen && "rotate-90"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", !isOpen && "invisible")}>
          <ControlsContext.Provider value={{ depth: depth + 1, isRoot: false }}>
            {value.map((item, index) => (
              <div
                key={index}
                className={cn(rowContainerStyles)}
                style={{ paddingLeft: `${(depth + 1) * 8}px` }}
              >
                <div
                  className={cn(
                    "min-w-1 self-stretch opacity-50",
                    controlGroupColors.COMPLEX
                  )}
                />
                <div className="flex w-full flex-row items-center justify-between pl-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "relative h-5 w-5 flex-shrink-0 rounded-sm border",
                        "border-slate-300 dark:border-zinc-600"
                      )}
                      style={{ backgroundColor: item }}
                    >
                      <input
                        type="color"
                        value={item}
                        onChange={(e) =>
                          handleItemChange(index, e.target.value)
                        }
                        disabled={disabled}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      disabled={disabled}
                      className={cn(
                        inputBaseStyles,
                        "w-24 font-mono uppercase bg-transparent dark:bg-transparent",
                        "focus:bg-slate-100 dark:focus:bg-zinc-700"
                      )}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    disabled={disabled}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center",
                      "text-slate-400 dark:text-zinc-500",
                      !disabled &&
                        "hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                    )}
                  >
                    <IconTrash className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <div
              className={cn(rowContainerStyles)}
              style={{ paddingLeft: `${(depth + 1) * 8}px` }}
            >
              <div
                className={cn(
                  "min-w-1 self-stretch opacity-50",
                  controlGroupColors.COMPLEX
                )}
              />
              <button
                onClick={handleAddItem}
                disabled={disabled}
                className={cn(
                  "flex h-full w-full items-center gap-2 px-2 text-xs",
                  "text-slate-500 dark:text-zinc-400",
                  !disabled &&
                    "hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                )}
              >
                <IconTablePlus className="size-4" />
                <span>Add Item</span>
              </button>
            </div>
          </ControlsContext.Provider>
        </div>
      </div>
    </div>
  );
}
