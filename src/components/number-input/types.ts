import { OmitMerge } from "@/lib/types";
import { InputHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";
import { InputDefaultProps } from "../form/types";

export type NumberInputFractionDigitsProps = {
  min?: number;
  max?: number;
};

export type NumberInputValueProps = {
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
};

export type NumberInputProps<TForm extends FieldValues> = OmitMerge<
  InputHTMLAttributes<HTMLInputElement>,
  NumberInputValueProps & InputDefaultProps<TForm>
> & {
  label?: string;
  isCurrency?: boolean;
  fractionDigits?: NumberInputFractionDigitsProps;
};

export type NumberInputRef = HTMLInputElement;
