import * as React from 'react'
import { twMerge } from 'tailwind-merge'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <table
            ref={ref}
            className={twMerge('w-full caption-bottom text-sm', className)}
            {...props}
        />
    ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={twMerge('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody ref={ref} className={twMerge('[&_tr:last-child]:border-0', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={twMerge('bg-primary font-medium text-primary-foreground', className)}
        {...props}
    />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr
            ref={ref}
            className={twMerge(
                'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                className,
            )}
            {...props}
        />
    ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={twMerge('h-fit pb-4 pr-2 text-start font-medium text-zinc-400', className)}
        {...props}
    />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={twMerge(
            `
            max-w-[350px]
            p-4
            pl-0
            align-middle
            text-xs
            md:text-sm
            [&:has([role=checkbox])]:pr-0
            `,
            className,
        )}
        {...props}
    />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={twMerge('mt-4 text-sm text-muted-foreground', className)}
        {...props}
    />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
