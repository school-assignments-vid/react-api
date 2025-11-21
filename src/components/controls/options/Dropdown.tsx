"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsDropdownProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Dropdown<T extends string | number>({
  title = "Dropdown",
  id,
  initialValue,
  options,
  disabled = false,
}: ControlsDropdownProps<T>) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const value = controlsState[id] ?? initialValue;

  const handleSelect = (newValue: T) => {
    updateControl(id, newValue);
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const PopoverContent = (
    <div
      ref={popoverRef}
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
        width: `${popoverPosition.width}px`,
      }}
      className={cn(
        "fixed z-50 rounded-md border bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="max-h-48 overflow-y-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-xs",
              "text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-700",
              option.value === value && "bg-slate-200/60 dark:bg-zinc-900/75"
            )}
          >
            <span>{option.label}</span>
            {option.value === value && (
              <IconCheck size={14} className="text-sky-500 dark:text-sky-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.OPTIONS)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>
        <div className="relative flex items-center">
          <button
            ref={triggerRef}
            onClick={handleTriggerClick}
            disabled={disabled}
            className={cn(
              inputBaseStyles,
              "flex w-36 items-center justify-between text-left",
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <span className="truncate">
              {selectedOption?.label ?? "Select..."}
            </span>
            <IconChevronDown
              size={14}
              className={cn(
                "shrink-0 transition-transform text-slate-500 dark:text-zinc-400",
                isOpen && "rotate-180"
              )}
            />
          </button>
          {isOpen && createPortal(PopoverContent, document.body)}
        </div>
      </div>
    </div>
  );
}
