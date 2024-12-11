import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { buttonVariants } from "./consts";
import { ButtonProps, ButtonRef } from "./types";
import { Loader2 } from "lucide-react";

export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = isLoading ? (
      <>
        <Loader2 className="absolute size-4 animate-spin" />
        <span className="invisible">{children}</span>
      </>
    ) : (
      children
    );

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            loading: isLoading,
            className,
          }),
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";
