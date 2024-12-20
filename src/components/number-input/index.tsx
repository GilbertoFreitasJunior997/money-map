import { fixedForwardRef } from "@/lib/react";
import { cn } from "@/lib/utils";
import { ChangeEvent, ForwardedRef } from "react";
import { FieldValues } from "react-hook-form";
import { FormInputBase } from "../form/components/form-input-base";
import { Input } from "../input";
import { currencyFormatter } from "./consts";
import { NumberInputProps, NumberInputRef } from "./types";

const NumberInputBase = <TForm extends FieldValues>(
  {
    className,
    value,
    fractionDigits = { min: 2, max: 2 },
    form,
    name,
    description,
    label,
    isCurrency,
    onChange,
    isSkeleton,
    ...props
  }: NumberInputProps<TForm>,
  ref: ForwardedRef<NumberInputRef>,
) => (
  <FormInputBase
    name={name}
    form={form}
    description={description}
    label={label}
    isSkeleton={isSkeleton}
  >
    {({ field }) => {
      const { max } = fractionDigits;

      if (!max) {
        return;
      }

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;

        const { value } = input;

        let newValue: number | undefined = undefined;

        try {
          newValue = Number.parseFloat(value.replace(/\D/g, ""));
          newValue = Number.isNaN(newValue) ? undefined : newValue / 10 ** max;
        } finally {
          onChange?.(newValue);
          field?.onChange(newValue);
        }
      };

      const baseValue = form ? field?.value : value;
      let inputValue = baseValue
        ? isCurrency
          ? currencyFormatter.format(baseValue)
          : baseValue.toString()
        : "";
      if (inputValue === "NaN") {
        inputValue = "";
      }

      return (
        <Input
          className={cn(
            "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          name={name as string}
          description={description}
          label={label}
          ref={ref}
          value={inputValue}
          onChange={handleChange}
          {...props}
        />
      );
    }}
  </FormInputBase>
);

export const NumberInput = fixedForwardRef(NumberInputBase);
