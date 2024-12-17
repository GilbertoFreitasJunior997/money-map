import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="grow flex flex-col justify-between space-y-2">
      <div className="flex justify-between">
        <Skeleton className="w-32 h-7" />
        <Skeleton className="w-14 h-7" />
      </div>
      <Skeleton className="size-full" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}
