import { cn } from "@/lib/utils";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { Icon } from "../icon";
import { Skeleton } from "../skeleton";
import {
  SheetBodyProps,
  SheetContentProps,
  SheetContentRef,
  SheetDescriptionProps,
  SheetDescriptionRef,
  SheetFooterProps,
  SheetHeaderProps,
  SheetTitleProps,
  SheetTitleRef,
} from "./types";

const Root = SheetPrimitive.Root;

const Trigger = SheetPrimitive.Trigger;

const Close = SheetPrimitive.Close;

const Body = ({ children }: SheetBodyProps) => (
  <div className="py-4 px-1 grow overflow-x-hidden overflow-auto">
    {children}
  </div>
);

const Content = forwardRef<SheetContentRef, SheetContentProps>(
  ({ className, children }, ref) => (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-35",
          className,
        )}
      />

      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg right-0 w-3/4 m-3 rounded-lg flex flex-col outline-none",
          "transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          className,
        )}
      >
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <Icon src={Cross2Icon} />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>

        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  ),
);
Content.displayName = SheetPrimitive.Content.displayName;

const Header = ({ className, ...props }: SheetHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
Header.displayName = "SheetHeader";

const Footer = ({
  className,
  isLoading,
  children,
  ...props
}: SheetFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  >
    {isLoading ? <Skeleton className="w-full h-12" /> : children}
  </div>
);
Footer.displayName = "SheetFooter";

const Title = forwardRef<SheetTitleRef, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
Title.displayName = SheetPrimitive.Title.displayName;

const Description = forwardRef<SheetDescriptionRef, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
Description.displayName = SheetPrimitive.Description.displayName;

export const Sheet = {
  Root,
  Trigger,
  Close,
  Body,
  Content,
  Header,
  Footer,
  Title,
  Description,
};
