import { FieldValues } from "react-hook-form";
import { InputDefaultProps } from "../form/types";

export type DateInputProps<TForm extends FieldValues> = OmitMerge<
  InputHTMLAttributes<HTMLInputElement>,
  InputDefaultProps<TForm>
> & {
  label?: string;
  value?: Date;
};

export type DateInputRef = HTMLButtonElement;
