import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="grow size-full grid place-content-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
