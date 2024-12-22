import { DataTableBulkRemove } from "../../types";

export type DataTableRemoveBulkDialogProps<TData> = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedRows: TData[];
  bulkRemove: DataTableBulkRemove<TData>;
  entityName: string;
  entityNamePlural: string;
};
