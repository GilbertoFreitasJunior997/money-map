import { fixedForwardRef } from "@/lib/react";
import { ForwardedRef } from "react";
import { FieldValues } from "react-hook-form";
import { DatePicker } from "../date-picker";
import { FormInputBase } from "../form/components/form-input-base";
import { DateInputProps, DateInputRef } from "./types";

const DateInputBase = <TForm extends FieldValues>(
  {
    value: baseValue,
    label,
    name,
    form,
    description,
    isSkeleton,
    ...props
  }: DateInputProps<TForm>,
  ref: ForwardedRef<DateInputRef>,
) => {
  return (
    <FormInputBase
      name={name}
      form={form}
      description={description}
      label={label}
      isSkeleton={isSkeleton}
    >
      {({ field }) => {
        const value = form ? field?.value : baseValue;

        const handleChange = (value?: Date) => {
          field?.onChange(value);
        };

        const Comp = (
          <DatePicker
            ref={ref}
            {...props}
            {...field}
            value={value}
            onChange={handleChange}
          />
        );

        return Comp;
      }}
    </FormInputBase>
  );
};

export const DateInput = fixedForwardRef(DateInputBase);
