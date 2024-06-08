import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './TableUI'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    pageIndex?: number
    emptyList?: React.ReactNode
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
    const { columns, data, pageSize = 10, pageIndex = 0, emptyList } = props

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([
        {
            // by default, latest files are shown first
            id: 'createdAt',
            desc: true,
        },
    ])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    })

    useEffect(() => {
        table.setPageIndex(pageIndex)
    }, [pageIndex, table])

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow
                        key={headerGroup.id}
                        className={twJoin(data.length === 0 && 'flex justify-between')}
                    >
                        {headerGroup.headers.map(header => {
                            return (
                                <TableHead
                                    key={header.id}
                                    className="h-fit p-0 pb-4 font-medium text-zinc-400"
                                >
                                    {!header.isPlaceholder &&
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="p-0">
                            {emptyList ?? <div className="h-24 text-center">No results found.</div>}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
