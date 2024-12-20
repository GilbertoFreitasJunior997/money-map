import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";

export type SheetOverlayProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>;
export type SheetOverlayRef = ElementRef<typeof SheetPrimitive.Overlay>;

export type SheetBodyProps = HTMLAttributes<HTMLDivElement>;

export type SheetContentProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
>;
export type SheetContentRef = ElementRef<typeof SheetPrimitive.Content>;

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

export type SheetFooterProps = HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean;
};

export type SheetTitleProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Title
>;
export type SheetTitleRef = ElementRef<typeof SheetPrimitive.Title>;

export type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Description
>;
export type SheetDescriptionRef = ElementRef<typeof SheetPrimitive.Description>;
