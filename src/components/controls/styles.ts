import { cn } from "@/lib/utils";

// Base styles for the outer container of a single control row.
export const rowContainerStyles = cn(
  "group flex h-7 w-full flex-row items-center border-t",
  "border-slate-200 dark:border-zinc-800"
);

// Styles for the colored "gutter" div on the left of each control.
export const gutterStyles = cn("min-w-1 self-stretch");

// Container for the content (label and input) inside a row.
export const rowContentContainerStyles = cn(
  "flex w-full flex-row items-center justify-between px-2"
);

// Standard text styles for the control's title/label.
export const labelStyles = cn(
  "select-none text-xs transition-colors truncate",
  "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
  "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
);

// Base styles for all text, number, and select inputs.
export const inputBaseStyles = cn(
  "h-5 rounded-sm border-0 bg-slate-100 px-1.5 text-xs outline-none ring-0",
  "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
  "disabled:cursor-not-allowed",
  "focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400"
);

// Styles for number inputs to hide the default spinners.
export const numberInputStyles = cn(
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
);
