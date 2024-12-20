import { Skeleton } from "@/components/skeleton";
import { TransactionListLayout } from "../transaction-list-layout";

export const TransactionListLoading = () => (
  <TransactionListLayout
    leftToolbarItems={Array.from({ length: 4 }, (_, index) => (
      <Skeleton
        key={index}
        className="w-12 h-6"
      />
    ))}
    rightToolbarItems={<Skeleton className="w-32 h-6" />}
    list={Array.from({ length: 5 }, (_, index) => (
      <Skeleton
        key={index}
        className="h-[98px] w-full rounded-lg"
      />
    ))}
  />
);
