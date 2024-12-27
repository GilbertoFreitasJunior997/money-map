import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { FormInputBase } from "../form/components/form-input-base";
import { Select } from "../select";
import { SelectBaseItem, SelectInputProps } from "./types";

export const SelectInput = <
  TItem extends SelectBaseItem,
  TForm extends FieldValues,
>({
  items: preItems,
  itemRender,
  value,
  onChange,
  placeholder,
  className,
  isLoading = false,
  ...formProps
}: SelectInputProps<TItem, TForm>) => (
  <FormInputBase {...formProps}>
    {({ field }) => {
      const baseItem = formProps.form ? field?.value : value;
      const selectedValue = baseItem ? String(baseItem.id) : undefined;

      const items =
        formProps.form && field?.value && isLoading
          ? [field.value as TItem]
          : preItems;

      const handleChange = (value?: string) => {
        if (value === "") {
          return;
        }

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
            <Select.Value placeholder={placeholder}>
              {itemRender && value
                ? itemRender(value)
                : (baseItem?.label ?? null)}
            </Select.Value>
          </Select.Trigger>
          <Select.Content>
            {isLoading && (
              <div className="h-12 grid place-content-center">
                <Loader2 className="size-4 animate-spin" />
              </div>
            )}

            <div className={cn(isLoading && "hidden")}>
              {items.length ? (
                items.map((item) => (
                  <Select.Item
                    key={item.id}
                    value={String(item.id)}
                  >
                    {itemRender ? itemRender(item) : item.label}
                  </Select.Item>
                ))
              ) : (
                <div className="text-sm text-center py-1"> No items </div>
              )}
            </div>
          </Select.Content>
        </Select.Root>
      );
    }}
  </FormInputBase>
);
