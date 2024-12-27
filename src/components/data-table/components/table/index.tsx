import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import {
  TableBodyProps,
  TableBodyRef,
  TableCaptionProps,
  TableCaptionRef,
  TableCellProps,
  TableCellRef,
  TableFooterProps,
  TableFooterRef,
  TableHeadProps,
  TableHeadRef,
  TableHeaderProps,
  TableHeaderRef,
  TableRootProps,
  TableRootRef,
  TableRowProps,
  TableRowRef,
} from "./types";

const Root = forwardRef<TableRootRef, TableRootProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto h-full bg-background rounded-md">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Root.displayName = "Table";

const Header = forwardRef<TableHeaderRef, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  ),
);
Header.displayName = "TableHeader";

const Body = forwardRef<TableBodyRef, TableBodyProps>((props, ref) => (
  <tbody
    ref={ref}
    {...props}
  />
));
Body.displayName = "TableBody";

const Footer = forwardRef<TableFooterRef, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  ),
);
Footer.displayName = "TableFooter";

const Row = forwardRef<TableRowRef, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
Row.displayName = "TableRow";

const Head = forwardRef<TableHeadRef, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 p-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
Head.displayName = "TableHead";

const Cell = forwardRef<TableCellRef, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
Cell.displayName = "TableCell";

const Caption = forwardRef<TableCaptionRef, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
Caption.displayName = "TableCaption";

export const Table = {
  Root,
  Header,
  Body,
  Footer,
  Head,
  Row,
  Cell,
  Caption,
};
