"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { Dialog } from "../dialog";
import { forwardRef } from "react";
import {
  CommandDialogProps,
  CommandEmptyProps,
  CommandEmptyRef,
  CommandGroupProps,
  CommandGroupRef,
  CommandInputProps,
  CommandInputRef,
  CommandItemProps,
  CommandItemRef,
  CommandListProps,
  CommandListRef,
  CommandRootProps,
  CommandRootRef,
  CommandSeparatorProps,
  CommandSeparatorRef,
  CommandShortcutProps,
} from "./types";
import { Icon } from "../icon";

const Root = forwardRef<CommandRootRef, CommandRootProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Root.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content className="overflow-hidden p-0">
        <Root className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const Input = forwardRef<CommandInputRef, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div
      className="flex items-center border-b px-3"
      cmdk-input-wrapper=""
    >
      <Icon
        src={MagnifyingGlassIcon}
        className="mr-2 shrink-0 opacity-50"
      />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Input.displayName = CommandPrimitive.Input.displayName;

const List = forwardRef<CommandListRef, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className,
      )}
      {...props}
    />
  ),
);
List.displayName = CommandPrimitive.List.displayName;

const Empty = forwardRef<CommandEmptyRef, CommandEmptyProps>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));
Empty.displayName = CommandPrimitive.Empty.displayName;

const Group = forwardRef<CommandGroupRef, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Group.displayName = CommandPrimitive.Group.displayName;

const Separator = forwardRef<CommandSeparatorRef, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  ),
);
Separator.displayName = CommandPrimitive.Separator.displayName;

const Item = forwardRef<CommandItemRef, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Item.displayName = CommandPrimitive.Item.displayName;

const Shortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
Shortcut.displayName = "CommandShortcut";

export const Command = {
  Root,
  Dialog: CommandDialog,
  Input,
  List,
  Empty,
  Group,
  Item,
  Shortcut,
  Separator,
};
