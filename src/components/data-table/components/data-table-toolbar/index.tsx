import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Plus } from "lucide-react";
import { DataTableViewOptions } from "../data-table-view-options";
import { DataTableToolbarProps } from "./types";

export const DataTableToolbar = <TData,>({
  table,
  create,
  entityName,
  areButtonsDisabled,
}: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {!!create && (
          <Button
            variant="default"
            disabled={areButtonsDisabled}
            {...create}
          >
            <Icon src={Plus} />
            {create?.text ?? (entityName ? `New ${entityName}` : null)}
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};
