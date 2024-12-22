export type CategorySheetProps = {
  isOpen: boolean;
  editCategoryId?: number;
  onSuccess: () => void;
  onOpenChange: (isOpen: boolean) => void;
};
