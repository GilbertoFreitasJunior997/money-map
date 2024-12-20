import { OmitMerge } from "@/lib/types";
import { InputHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";
import { InputDefaultProps } from "../form/types";

export type TextAreaInputProps<TForm extends FieldValues> = OmitMerge<
  InputHTMLAttributes<HTMLTextAreaElement>,
  InputDefaultProps<TForm>
> & {
  label?: string;
};

export type TextAreaInputRef = HTMLTextAreaElement;
