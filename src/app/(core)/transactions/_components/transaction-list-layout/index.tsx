import { TransactionListLayoutProps } from "./types";

export const TransactionListLayout = ({
  leftToolbarItems,
  rightToolbarItems,
  list,
}: TransactionListLayoutProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2">{leftToolbarItems}</div>
        {rightToolbarItems}
      </div>
      <div className="space-y-2 overflow-hidden">{list}</div>
    </div>
  );
};
