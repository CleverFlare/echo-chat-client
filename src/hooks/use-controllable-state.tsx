import {
  useState,
  useCallback,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * Parameters for the `useControllableState` hook.
 *
 * @template T - The type of the value being managed.
 */
interface UseControllableStateParams<T> {
  /**
   * The controlled value. When provided, the component is in controlled mode
   * and the parent is responsible for managing state updates via `onChange`.
   * Pass `undefined` (or omit) to use uncontrolled mode.
   */
  value?: T;

  /**
   * The initial value used when the component is uncontrolled.
   * Ignored if `value` is provided.
   */
  defaultValue?: T;

  /**
   * Callback fired whenever the value changes, in both controlled and
   * uncontrolled mode. In controlled mode this is the only mechanism
   * for the parent to receive updates — it must reflect the new value
   * back via `value` to complete the controlled cycle.
   *
   * @param value - The new value after the update.
   */
  onChange?: (value: T) => void;
}

/**
 * Enables a component to be either controlled or uncontrolled, determined
 * at runtime by whether `value` is provided — mirroring how React's own
 * `<input>` element behaves.
 *
 * - **Controlled**: pass `value` + `onChange`. The parent owns the state;
 *   the hook notifies changes through `onChange` and always reflects the
 *   latest `value`.
 * - **Uncontrolled**: pass only `defaultValue` (or nothing). The hook manages
 *   an internal `useState` and still fires `onChange` on every change.
 *
 * The returned setter mirrors the `useState` setter API and supports both
 * direct values and functional updaters (`setValue(prev => prev + 1)`).
 *
 * @template T - The type of the value being managed.
 *
 * @param params - Configuration options (all optional).
 * @param params.value        - Controlled value; omit for uncontrolled mode.
 * @param params.defaultValue - Initial value for uncontrolled mode.
 * @param params.onChange     - Called whenever the value changes.
 *
 * @returns A `[value, setValue]` tuple, identical in shape to `useState`.
 *
 * @example
 * // Uncontrolled — state lives inside the hook
 * const [val, setVal] = useControllableState({ defaultValue: "hello" });
 *
 * @example
 * // Controlled — parent owns the state
 * const [name, setName] = useState("hello");
 * const [val, setVal] = useControllableState({ value: name, onChange: setName });
 *
 * @example
 * // Inside a reusable input component
 * function TextInput({ value, defaultValue, onChange, ...props }) {
 *   const [internalValue, setValue] = useControllableState({
 *     value,
 *     defaultValue,
 *     onChange,
 *   });
 *
 *   return (
 *     <input
 *       {...props}
 *       value={internalValue ?? ""}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T> = {}): [
  T | undefined,
  SetValue<T | undefined>,
] {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );

  const currentValue = isControlled ? value : internalValue;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue: SetValue<T | undefined> = useCallback(
    (nextValue) => {
      const setter =
        typeof nextValue === "function"
          ? (nextValue as (prev: T | undefined) => T | undefined)
          : () => nextValue as T | undefined;

      if (!isControlled) {
        setInternalValue((prev) => {
          const resolved = setter(prev);
          onChangeRef.current?.(resolved as T);
          return resolved;
        });
      } else {
        const resolved = setter(currentValue);
        onChangeRef.current?.(resolved as T);
      }
    },
    [isControlled, currentValue],
  );

  return [currentValue, setValue];
}
