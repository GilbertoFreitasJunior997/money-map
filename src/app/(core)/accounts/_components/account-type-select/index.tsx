"use client";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { SelectInput } from "@/components/select-input";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  getAccountSelectData,
  getAccountType,
  removeAccountType,
} from "../../actions";
import { AccountTypeSelectProps } from "./types";

export const AccountTypeSelect = ({
  form,
  setIsAccountTypeSheetOpen,
  setAccountTypeUpdateData,
}: AccountTypeSelectProps) => {
  const queryClient = useQueryClient();
  const [isLoadingAccountType, setIsLoadingAccountType] = useState(false);

  const {
    data: accountTypes,
    isLoading: isLoadingAccountTypes,
    isFetching: isFetchingAccountTypes,
  } = useQuery({
    queryKey: ["accountTypes", "select"],
    queryFn: getAccountSelectData,
  });

  const {
    mutate: removeAccountTypeMutation,
    isPending: isRemovingAccountType,
  } = useActionMutation({
    action: removeAccountType,
    onSuccess: async (removedId) => {
      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["accountTypes"],
      });

      const selectedAccountType = form.getValues().accountType;
      if (selectedAccountType.id !== removedId) {
        return;
      }

      form.resetField("accountType", {
        defaultValue: undefined,
      });
    },
  });

  const handleEditClick = async (id: number) => {
    setIsLoadingAccountType(true);

    const accountType = await getAccountType(id);
    if (accountType.success) {
      setAccountTypeUpdateData(accountType.data);
      setIsAccountTypeSheetOpen(true);
    } else {
      let message = "Something went wrong!";
      if (accountType.error instanceof Error) {
        message = accountType.error.message;
      }
      toast.error(message);
    }

    setIsLoadingAccountType(false);
  };

  const areButtonsDisabled =
    isLoadingAccountType || isRemovingAccountType || isFetchingAccountTypes;

  return (
    <div className="flex w-full gap-2 overflow-hidden">
      <SelectInput
        name="accountType"
        label="Account Type"
        form={form}
        items={accountTypes || []}
        isLoading={isLoadingAccountTypes}
        className="grow"
        buttons={[
          {
            onClick: (id) => handleEditClick(Number.parseInt(id)),
            disabled: areButtonsDisabled,
            icon: {
              src: Edit2Icon,
            },
          },
          {
            onClick: (id) => removeAccountTypeMutation(Number.parseInt(id)),
            disabled: areButtonsDisabled,
            icon: {
              src: TrashIcon,
            },
          },
        ]}
      />
      <Button
        className="mb-[2px] size-8 rounded-sm grid place-content-center mt-[35px]"
        variant="secondary"
        type="button"
        title="Create account type"
        onClick={() => setIsAccountTypeSheetOpen(true)}
      >
        <Icon
          src={PlusIcon}
          className="size-3"
        />
      </Button>
    </div>
  );
};
