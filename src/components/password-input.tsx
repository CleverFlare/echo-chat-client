import { cn } from "@/lib/utils";
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type InputProps, Input as NativeInput } from "./ui/input";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

const PasswordContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

const useShowPassword = () => {
  return useContext(PasswordContext);
};

export function Root({ className, ...props }: ComponentProps<"div">) {
  const [show, setShow] = useState(false);
  return (
    <PasswordContext.Provider value={[show, setShow]}>
      <div className={cn("relative", className)} {...props} />
    </PasswordContext.Provider>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type, className, ...props },
  ref,
) {
  const [show] = useShowPassword();
  return (
    <NativeInput
      ref={ref}
      type={(type ?? show) ? "text" : "password"}
      className={cn("pe-10", className)}
      {...props}
    />
  );
});

export function ShowHideButton({
  className,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const [show, setShow] = useShowPassword();
  return (
    <button
      type="button"
      className={cn(
        "absolute top-1 right-1 h-[80%] aspect-square flex justify-center items-center hover:bg-black/10 rounded-lg",
        className,
      )}
      onClick={(...args) => {
        setShow((prev) => !prev);

        if (onClick) onClick(...args);
      }}
      {...props}
    >
      {show ? <EyeSlashIcon /> : <EyeIcon />}
    </button>
  );
}
