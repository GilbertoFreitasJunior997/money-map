import { Dispatch, SetStateAction } from "react";

export type DatePickerProps = {
  value: Date | undefined;
  onChange: Dispatch<SetStateAction<Date | undefined>>;
};
