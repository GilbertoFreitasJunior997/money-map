import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { InputDefaultProps } from "../form/types";
import { selectBaseItemSchema } from "./consts";

export type SelectBaseItem = z.infer<typeof selectBaseItemSchema>;

export type SelectInputProps<
  TItem extends SelectBaseItem,
  TForm extends FieldValues,
> = InputDefaultProps<TForm> & {
  items: TItem[];
  itemRender?: (item: TItem) => ReactNode;
  value?: TItem;
  onChange?: (value?: TItem) => void;
  className?: string;
  placeholder?: ReactNode;
  isLoading?: boolean;
};
