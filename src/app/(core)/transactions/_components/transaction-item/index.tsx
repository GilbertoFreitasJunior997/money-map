import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import { TransactionItemProps } from "./types";

export function TransactionItem({
  transaction,
  onRemoveClick,
}: TransactionItemProps) {
  const { id, description, notes, amount, type, category } = transaction;

  const typeConfig = {
    expense: {
      color: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900",
      icon: ArrowDownIcon,
    },
    income: {
      color:
        "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
      icon: ArrowUpIcon,
    },
    transfer: {
      color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900",
      icon: ArrowRightIcon,
    },
  };

  const { color, icon: Icon } = typeConfig[type];

  return (
    <div className="bg-card text-card-foreground border hover:border-accent-foreground/60 transition-colors rounded-lg p-4">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <div className="flex items-center space-x-4">
          <div className={cn("p-2 rounded-full", color)}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{description}</h3>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={cn("text-lg font-bold", color.split(" ")[0])}>
            {type === "expense" ? "-" : ""}$
            {Math.abs(Number.parseFloat(amount)).toFixed(2)}
          </span>
          <div className="flex items-center justify-end mt-1 space-x-2">
            <span className="text-xs text-muted-foreground">
              Category: {category}
            </span>

            <Button
              variant="ghost"
              size="icon"
              // onClick={onEdit}
              className="h-8 w-8"
            >
              <Edit2Icon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveClick(id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
