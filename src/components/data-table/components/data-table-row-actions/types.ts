import { DataTableEdit, DataTableRemove } from "../../types";

export type DataTableRowActionsProps<TData> = {
  entityName?: string;
  data: TData;
  edit?: DataTableEdit<TData>;
  remove?: DataTableRemove<TData>;
  areButtonsDisabled?: boolean;
};
