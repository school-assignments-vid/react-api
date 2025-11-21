/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

export interface ControlsProps {
  title?: string;
  children?: React.ReactNode;
  initiallyOpen?: boolean;
}

export interface ControlsFolderProps {
  title?: string;
  children?: React.ReactNode;
  initiallyOpen?: boolean;
}

export interface ControlsButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ControlsCheckboxProps {
  title?: string;
  id: string;
  initialValue: boolean;
  disabled?: boolean;
}

export interface ControlsToggleProps {
  title?: string;
  id: string;
  initialValue: boolean;
  disabled?: boolean;
}

export interface ControlsTextProps {
  title?: string;
  id: string;
  initialValue: string;
  disabled?: boolean;
}

export interface ControlsSliderProps {
  title?: string;
  id: string;
  initialValue: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}

export interface ControlsNumberProps {
  title?: string;
  id: string;
  initialValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export interface ControlsDropdownProps<T extends string | number> {
  title?: string;
  id: string;
  initialValue: T;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
}

export interface ControlsColorProps {
  title?: string;
  id: string;
  initialValue: string;
  disabled?: boolean;
}

export interface ControlsTextAreaProps {
  title?: string;
  id: string;
  initialValue: string;
  rows?: number;
  disabled?: boolean;
}

export interface ControlsRangeSliderProps {
  title?: string;
  id: string;
  initialValue: { min: number; max: number };
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}

export interface ControlsMonitorProps {
  title?: string;
  id: string;
}

export interface ControlsTitleProps {
  title?: string;
}

export interface ControlsRadioGroupProps<T extends string | number> {
  title?: string;
  id: string;
  initialValue: T;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
}

export interface ControlsProgressProps {
  title?: string;
  id: string;
  min?: number;
  max?: number;
}

export interface ControlsInfoProps {
  text: string | React.ReactNode;
}

export interface ControlsAlertProps {
  text: string;
  variant?: "info" | "success" | "warning" | "error";
  show?: boolean;
}

export interface ControlsSpacerProps {
  size?: "sm" | "md" | "lg";
}

export interface ControlsColorArrayProps {
  title?: string;
  id: string;
  initialValue: string[];
  newItemValue?: string;
  initiallyOpen?: boolean;
  disabled?: boolean;
}

export type ControlsConditionalProps = { children: React.ReactNode } & (
  | {
      condition: (state: Record<string, any>) => boolean;
      when?: never;
      is?: never;
    }
  | {
      condition?: never;
      when: string;
      is: any;
    }
);

export interface ControlsStringArrayProps {
  title?: string;
  id: string;
  initialValue: string[];
  newItemValue?: string;
  initiallyOpen?: boolean;
  disabled?: boolean;
}

export interface ControlsNumberArrayProps {
  title?: string;
  id: string;
  initialValue: number[];
  newItemValue?: number;
  initiallyOpen?: boolean;
  disabled?: boolean;
}

export interface ControlsPlotProps {
  title?: string;
  id: string;
  history?: number;
  fill?: boolean;
}

export interface ControlsBezierProps {
  title?: string;
  id: string;
  initialValue: [number, number, number, number];
  disabled?: boolean;
}

type VectorValue3D =
  | { x: number; y: number; z: number }
  | [number, number, number];
export interface ControlsVector3DProps {
  title?: string;
  id: string;
  initialValue: VectorValue3D;
  step?: number;
  disabled?: boolean;
}

type VectorValue2D = { x: number; y: number } | [number, number];
export interface ControlsVector2DProps {
  title?: string;
  id: string;
  initialValue: VectorValue2D;
  disabled?: boolean;
}

export interface ControlsImageProps {
  title?: string;
  id: string;
  initialValue: string;
  disabled?: boolean;
}

export interface ControlsIconPickerProps {
    title?: string;
    id: string;
    initialValue: string;
    disabled?: boolean;
}