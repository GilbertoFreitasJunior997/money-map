import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { TransactionListData } from "@/models/transaction.model";
import { useQueryClient } from "@tanstack/react-query";
import { removeTransaction } from "../../actions";
import { TransactionRemoveDialogProps } from "./types";

export const TransactionRemoveDialog = ({
  transactionId,
  onClose,
}: TransactionRemoveDialogProps) => {
  const queryClient = useQueryClient();

  const handleSettled = async () => {
    queryClient.invalidateQueries({
      queryKey: ["transactions"],
      exact: false,
    });
  };

  const handleRemoveAction = async (id: number) => {
    await queryClient.setQueryData(
      ["transactions"],
      (data: TransactionListData[] | undefined) => {
        if (!data?.length) {
          return data;
        }

        const filteredData = data.filter((item) => item.id !== transactionId);
        return filteredData;
      },
    );

    onClose();

    const result = await removeTransaction(id);
    return result;
  };

  const { mutate, isPending } = useActionMutation({
    action: handleRemoveAction,
    onSuccess: handleSettled,
    mutationKey: ["transactions"],
  });

  return (
    <Dialog.Root
      open={!!transactionId}
      onOpenChange={onClose}
    >
      <Dialog.Content className="w-[350px]">
        <Dialog.Title>Remove Transaction</Dialog.Title>
        <p className="pt-2">
          Are you sure you want to remove this transaction?
        </p>
        <p className="pb-4">This action cannot be undone!</p>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button
              variant="secondary"
              disabled={isPending}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            variant="destructive"
            isLoading={isPending}
            onClick={() => {
              if (!transactionId) {
                return;
              }

              mutate(transactionId);
            }}
          >
            Remove
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
