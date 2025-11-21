"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { IconChevronDown, IconSearch, IconMoodSad } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsIconPickerProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";
import { iconMap, iconNames } from "../internal/icon-manifest";

export function IconPicker({
  title = "Icon",
  id,
  initialValue,
  disabled = false,
}: ControlsIconPickerProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const [popoverPosition, setPopoverPosition] = React.useState({
    top: 0,
    left: 0,
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

  const value: string = controlsState[id] ?? initialValue;
  const CurrentIcon = iconMap[value] || iconMap.IconAlertTriangle;

  const filteredIcons = iconNames.filter((name) =>
    name
      .toLowerCase()
      .replace("icon", "")
      .includes(searchTerm.toLowerCase().replace("icon", ""))
  );

  const handleIconSelect = (iconName: string) => {
    updateControl(id, iconName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleTriggerClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverWidth = 256;

      let left = rect.left;
      if (left + popoverWidth > window.innerWidth) {
        left = rect.right - popoverWidth;
      }

      setPopoverPosition({
        top: rect.bottom + 8,
        left: left,
      });
    }
    setIsOpen(!isOpen);
  };

  const PopoverContent = (
    <div
      ref={popoverRef}
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
      }}
      className={cn(
        "fixed z-50 w-64 rounded-md border bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="relative mb-2">
        <IconSearch
          size={14}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-7 w-full rounded-sm border bg-transparent pl-7 pr-2 text-xs dark:border-zinc-600"
          autoFocus
        />
      </div>

      <div className="max-h-48 overflow-y-auto">
        {filteredIcons.length > 0 ? (
          <div className="grid grid-cols-6 gap-1">
            {filteredIcons.map((iconName) => {
              const Icon = iconMap[iconName];
              return (
                <button
                  key={iconName}
                  title={iconName}
                  onClick={() => handleIconSelect(iconName)}
                  className={cn(
                    "flex items-center justify-center rounded p-2 text-slate-600 dark:text-zinc-300",
                    "hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-zinc-700 dark:hover:text-sky-400",
                    value === iconName &&
                      "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
                  )}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <IconMoodSad className="h-8 w-8 text-slate-300 dark:text-zinc-600" />
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              No results for <br />
              <span className="font-medium text-slate-700 dark:text-zinc-200">
                &quot;{searchTerm}&quot;
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.SPECIAL)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>
        <button
          ref={triggerRef}
          onClick={handleTriggerClick}
          disabled={disabled}
          className={cn(
            inputBaseStyles,
            "flex w-36 items-center justify-between",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <div className="flex items-center gap-1.5 truncate">
            <CurrentIcon size={14} className="flex-shrink-0" />
            <span className="truncate">{value.replace("Icon", "")}</span>
          </div>
          <IconChevronDown
            size={14}
            className={cn(
              "flex-shrink-0 transition-transform text-slate-500 dark:text-zinc-400",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && createPortal(PopoverContent, document.body)}
      </div>
    </div>
  );
}
