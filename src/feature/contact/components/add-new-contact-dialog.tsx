import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "@phosphor-icons/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  username: yup.string().required().min(3).label("Username"),
});

type Schema = yup.InferType<typeof schema>;

export function AddNewContactDialog() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  function onSubmit(data: Schema) {
    setPending(true);

    console.log("USERNAME", data.username);

    setTimeout(() => {
      setPending(false);
      reset();
      setOpen(false);
    }, 1000);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button size="icon">
          <UserPlus size={20} />
        </Button>
      </DialogPrimitive.Trigger>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay
              className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
              asChild
            >
              <motion.div
                data-name="Hi there"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content
              className="bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg"
              asChild
            >
              <motion.form
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <DialogPrimitive.Title className="text-2xl font-bold">
                  Add New Contact
                </DialogPrimitive.Title>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      autoComplete="new-password"
                      placeholder="Username"
                      {...register("username")}
                    />
                    <Button disabled={pending}>
                      {pending && <Loader2 className="animate-spin" />}
                      Add
                    </Button>
                  </div>
                  <p className="text-sm text-destructive">
                    {errors.username?.message}
                  </p>
                </div>
                <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.form>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
