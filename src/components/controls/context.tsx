/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

interface ControlsStateContextType {
  controlsState: Record<string, any>;
  updateControl: (id: string, value: any) => void;
  registerControl: (id: string, initialValue: any) => void;
}

const ControlsStateContext = React.createContext<
  ControlsStateContextType | undefined
>(undefined);

export function ControlsProvider({ children }: { children: React.ReactNode }) {
  const [controlsState, setControlsState] = React.useState<Record<string, any>>(
    {}
  );

  const registerControl = React.useCallback((id: string, initialValue: any) => {
    setControlsState((prevState) => {
      if (Object.prototype.hasOwnProperty.call(prevState, id)) {
        return prevState;
      }
      return {
        ...prevState,
        [id]: initialValue,
      };
    });
  }, []);

  const updateControl = React.useCallback((id: string, value: any) => {
    setControlsState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  return (
    <ControlsStateContext.Provider
      value={{ controlsState, updateControl, registerControl }}
    >
      {children}
    </ControlsStateContext.Provider>
  );
}

export function useControlState() {
  const context = React.useContext(ControlsStateContext);
  if (context === undefined) {
    throw new Error("useControlState must be used within a ControlsProvider");
  }
  return context;
}

interface ControlsContextType {
  depth: number;
  isRoot: boolean;
}
const ControlsContext = React.createContext<ControlsContextType | undefined>(
  undefined
);

export function useControlsContext() {
  const context = React.useContext(ControlsContext);
  if (context === undefined) {
    throw new Error(
      "This component must be used within a <Controls> container."
    );
  }
  return context;
}

export { ControlsContext };
