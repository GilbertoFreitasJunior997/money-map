import { FieldValues } from "react-hook-form";
import { InputDefaultProps } from "../form/types";
import { OmitMerge } from "@/lib/types";
import { InputHTMLAttributes } from "react";
import { DateRange } from "react-day-picker";

type DateRangeInputValueProps = {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
};

export type DateRangeInputProps<TForm extends FieldValues> = OmitMerge<
  InputHTMLAttributes<HTMLDivElement>,
  InputDefaultProps<TForm> & DateRangeInputValueProps
> & {
  label?: string;
};

export type DateRangeInputRef = HTMLDivElement;
