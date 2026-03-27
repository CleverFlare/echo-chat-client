import { Input } from "@/components/ui/input";
import { useControllableState } from "@/hooks/use-controllable-state";

export function SearchInput({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internalValue, setValue] = useControllableState({
    value,
    onChange,
  });
  return (
    <Input
      placeholder="Search..."
      value={internalValue ?? ""}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
