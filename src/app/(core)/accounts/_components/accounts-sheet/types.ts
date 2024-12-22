export type AccountsSheetProps = {
  isOpen: boolean;
  editAccountId?: number;
  onSuccess: () => void;
  onOpenChange: (isOpen: boolean) => void;
};
