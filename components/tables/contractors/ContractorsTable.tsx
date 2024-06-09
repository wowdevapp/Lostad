"use client"

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import * as React from "react";


import { Worker } from "@/components/dashboard/TabContainer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function ContractorsTable({ data, columns }: { data: Worker[], columns: any }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        columnResizeMode: 'onChange',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            columnSizing: {
                defaultColumnSize: 10,
                defaultColumnMinSize: 8,
                defaultColumnMaxSize: 200,
            }
        },
    })

    return (

        <div className="flex-1 pt-4">
            <div className="bg-white border">
                <ScrollArea className="h-[calc(80vh-70px)] rounded-md border w-full">
                    <Table>
                        <TableHeader className="">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead className={cn(header.id === 'id' || header.id === 'worker' ? 'border' : '', 'text-center m-auto', `w-[${header.getSize()}px]`)} key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {/* <TableCell className="w-10 text-center border-r" key={row.id}>
                                        {Number(row.id) + 1}
                                    </TableCell> */}
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className={cn(cell.id === index + '_id' || cell.id === index + '_worker' ? 'border' : '', cell.id, `w-[${cell.column.getSize()}px]`)} key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
        </div >
    )
}
