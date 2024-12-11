import { FieldValues } from "react-hook-form";
import { FormInputBase } from "../form/components/form-input-base";
import { Select } from "../select";
import { SelectBaseItem, SelectInputProps } from "./types";
import { Loader2 } from "lucide-react";

export const SelectInput = <
  TItem extends SelectBaseItem,
  TForm extends FieldValues,
>({
  items,
  value,
  onChange,
  placeholder,
  className,
  isLoading = false,
  ...formProps
}: SelectInputProps<TItem, TForm>) => (
  <FormInputBase {...formProps}>
    {({ field }) => {
      const baseValue = formProps.form ? field?.value?.id : value?.id;
      const selectedValue = baseValue ? String(baseValue) : undefined;

      const handleChange = (value?: string) => {
        const newValue = items.find((item) => String(item.id) === value);

        onChange?.(newValue);
        field?.onChange(newValue);
      };

      const content = isLoading ? (
        <div className="h-12 grid place-content-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : (
        items.map((item) => (
          <Select.Item
            key={item.id}
            value={String(item.id)}
          >
            {item.label}
          </Select.Item>
        ))
      );

      return (
        <Select.Root
          value={selectedValue}
          onValueChange={handleChange}
        >
          <Select.Trigger className={className}>
            <Select.Value placeholder={placeholder} />
          </Select.Trigger>
          <Select.Content>{content}</Select.Content>
        </Select.Root>
      );
    }}
  </FormInputBase>
);
