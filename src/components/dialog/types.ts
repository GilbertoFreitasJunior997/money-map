import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogOverlayProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;
export type DialogOverlayRef = ElementRef<typeof DialogPrimitive.Overlay>;

export type DialogContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>;
export type DialogContentRef = ElementRef<typeof DialogPrimitive.Content>;

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;
export type DialogTitleRef = ElementRef<typeof DialogPrimitive.Title>;
