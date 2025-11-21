/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  IconPhoto,
  IconTrash,
  IconUpload,
  IconWorldWww,
} from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsImageProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
} from "../styles";

export function Image({
  title = "Image",
  id,
  initialValue,
  disabled = false,
}: ControlsImageProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateControl(id, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateControl(id, e.target.value);
  };

  return (
    <div
      style={indentStyle}
      className={cn(
        rowContainerStyles,
        "h-auto items-start",
        disabled && "opacity-50"
      )}
    >
      <div className={cn(gutterStyles, controlGroupColors.ASSETS)} />
      <div className="flex w-full flex-col gap-2 px-2 py-1.5">
        <div className="flex w-full items-center justify-between">
          <span className={cn(labelStyles)}>{title}</span>
          {value && (
            <button
              onClick={() => updateControl(id, "")}
              className="flex h-6 w-6 items-center justify-center rounded-sm text-slate-400 hover:bg-red-100 hover:text-red-700 dark:text-zinc-500 dark:hover:bg-red-500/20 dark:hover:text-red-400"
            >
              <IconTrash size={14} />
            </button>
          )}
        </div>

        <div className="flex h-28 w-full items-center justify-center rounded-sm bg-slate-100 dark:bg-zinc-800">
          {value ? (
            <img
              src={value}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <IconPhoto className="h-8 w-8 text-slate-300 dark:text-zinc-600" />
          )}
        </div>

        <div className="flex w-full items-center gap-1">
          <IconWorldWww className="h-5 w-5 flex-shrink-0 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Paste image URL..."
            value={value?.startsWith("data:") ? "" : value}
            onChange={handleUrlChange}
            disabled={disabled}
            className={cn(inputBaseStyles, "!h-6 flex-grow")}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
          >
            <IconUpload size={14} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
