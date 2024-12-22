import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { DataTableRemoveBulkDialogProps } from "./types";

export const DataTableRemoveBulkDialog = <TData,>({
  isOpen,
  onClose,
  onSuccess,
  selectedRows,
  bulkRemove,
  entityName,
  entityNamePlural,
}: DataTableRemoveBulkDialogProps<TData>) => {
  const { mutate, isPending } = useActionMutation({
    action: bulkRemove.action,
    onSuccess: onSuccess,
    mutationKey: bulkRemove.mutationKey,
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
    >
      <Dialog.Content className="w-[350px]">
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Description>
          {selectedRows.length === 1 ? (
            <>You are about to delete this {entityName}</>
          ) : (
            <>
              You are about to delete {selectedRows.length}{" "}
              {entityNamePlural.toLowerCase()}
            </>
          )}
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.Close
            asChild
            disabled={isPending}
          >
            <Button variant="secondary">Cancel</Button>
          </Dialog.Close>
          <Button
            variant="destructive"
            isLoading={isPending}
            onClick={() => mutate(selectedRows)}
          >
            Remove
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
