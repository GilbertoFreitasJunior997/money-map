import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

export type TableRootProps = HTMLAttributes<HTMLTableElement>;
export type TableRootRef = HTMLTableElement;

export type TableHeaderRef = HTMLTableSectionElement;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyRef = HTMLTableSectionElement;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableFooterRef = HTMLTableSectionElement;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableRowRef = HTMLTableRowElement;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export type TableHeadRef = HTMLTableCellElement;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

export type TableCellRef = HTMLTableCellElement;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export type TableCaptionRef = HTMLTableCaptionElement;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
