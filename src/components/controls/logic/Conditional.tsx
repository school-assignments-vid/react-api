"use client";
import * as React from "react";
import { useControlState } from "../context";
import { ControlsConditionalProps } from "../types";

/**
 * A component that conditionally renders its children based on a control's state.
 *
 * This component is useful for creating dynamic user interfaces where the visibility
 * of certain elements depends on the value of other controls.
 *
 * @param {object} props - The props for the component.
 * @param {function(object): boolean} [props.condition] - A function that takes the `controlsState` object and returns `true` or `false` to determine if the children should be rendered. This prop takes precedence over `when` and `is`.
 * @param {string} [props.when] - The key of a control in the `controlsState` object to check.
 * @param {any} [props.is] - The value that the control specified by `when` must equal for the children to be rendered.
 * @param {React.ReactNode} props.children - The elements to be rendered if the condition is met.
 * @returns {React.ReactNode | null} The children of the component if the condition is met, otherwise `null`.
 */
export function Conditional({
  condition,
  when,
  is,
  children,
}: ControlsConditionalProps) {
  const { controlsState } = useControlState();

  const shouldRender = React.useMemo(() => {
    if (condition) {
      try {
        return condition(controlsState);
      } catch (e) {
        console.error("Error evaluating condition:", e);
        return false;
      }
    }

    if (when) {
      return controlsState[when] === is;
    }
    return false;
  }, [controlsState, condition, when, is]);

  return shouldRender ? <>{children}</> : null;
}
