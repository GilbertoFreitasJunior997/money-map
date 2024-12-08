import { FieldValues } from "react-hook-form";
import { FormInputBase } from "../form/components/form-input-base";
import { Select } from "../select";
import { SelectBaseItem, SelectInputProps } from "./types";

export const SelectInput = <
  TItem extends SelectBaseItem,
  TForm extends FieldValues,
>({
  items,
  value,
  onChange,
  placeholder,
  className,
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

      return (
        <Select.Root
          value={selectedValue}
          onValueChange={handleChange}
        >
          <Select.Trigger className={className}>
            <Select.Value placeholder={placeholder} />
          </Select.Trigger>
          <Select.Content>
            {items.map((item) => (
              <Select.Item
                key={item.id}
                value={String(item.id)}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      );
    }}
  </FormInputBase>
);
