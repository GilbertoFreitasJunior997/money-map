"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { signOff } from "./actions";

export const SignOffDropdownItem = () => {
  const queryClient = useQueryClient();

  const [isPending, setIsPending] = useState(false);

  const handleSelect = async () => {
    try {
      setIsPending(true);

      queryClient.clear();
      await signOff();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <DropdownMenu.Item
      disabled={isPending}
      onSelect={handleSelect}
    >
      Log out
    </DropdownMenu.Item>
  );
};
