import { useControllableState } from "@/hooks/use-controllable-state";
import type { ChangeEvent, ComponentProps } from "react";

/**
 * Adapts `useControllableState` to work with native input elements by
 * accepting the standard `value`/`onChange` props from `ComponentProps<"input">`
 * and bridging the DOM event to the hook's value-based contract.
 *
 * @param value    - Controlled value from input props.
 * @param onChange - Native change event handler from input props.
 *
 * @returns A `[value, onChange]` tuple that can be spread directly onto an input.
 */
export function useControllableInputState({
  value,
  onChange,
}: Pick<ComponentProps<"input">, "value" | "onChange">) {
  const [internalValue, setValue] = useControllableState<string>({
    value: value as string | undefined,
    onChange: (val) =>
      onChange?.({ target: { value: val } } as ChangeEvent<HTMLInputElement>),
  });

  return [
    internalValue ?? "",
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  ] as const;
}
