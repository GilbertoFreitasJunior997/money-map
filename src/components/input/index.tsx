"use client";

import { fixedForwardRef } from "@/lib/react";
import { cn } from "@/lib/utils";
import { ChangeEvent, ForwardedRef } from "react";
import { FieldValues } from "react-hook-form";
import { FormInputBase } from "../form/components/form-input-base";
import { InputProps, InputRef } from "./types";

const InputBase = <TForm extends FieldValues>(
  {
    className,
    value: baseValue,
    label,
    onChange,
    name,
    children: _,
    form,
    description,
    isSkeleton,
    ...props
  }: InputProps<TForm>,
  ref: ForwardedRef<InputRef>,
) => (
  <FormInputBase
    name={name}
    form={form}
    description={description}
    label={label}
    isSkeleton={isSkeleton}
  >
    {({ field }) => {
      const value = form ? (field?.value ?? "") : baseValue;
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        field?.onChange(event);
      };

      const Comp = (
        <input
          className={cn(
            "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
          {...field}
          value={value}
          onChange={handleChange}
        />
      );
      if (!label) {
        return Comp;
      }

      return <div className="space-y-1">{Comp}</div>;
    }}
  </FormInputBase>
);

export const Input = fixedForwardRef(InputBase);
