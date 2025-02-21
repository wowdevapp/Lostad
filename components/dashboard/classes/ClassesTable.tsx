"use client"

import {
    ColumnDef
} from "@tanstack/react-table"



import ClassTableHeader from "./classTableHeader"
import { Course } from "./types"
import { ClassData } from "../../../lib/class/types"
import { Badge } from "@/components/ui/badge"
import { SharedTable } from "@/components/SharedTable"

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => {
            const levels = row.getValue<string[]>("level")
            return levels.map(level => <Badge className="mb-1 cursor-pointer" variant={'secondary'} key={level}>{level}</Badge>)
        }
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const currency = row.original.currency.toUpperCase()
            return `${row.getValue("price")} ${currency}`
        }
    },
    {
        accessorKey: "format",
        header: "Format",
        cell: ({ row }) => {
            return row.getValue<string>("format").toUpperCase()
        }
    },
    {
        accessorKey: "languages",
        header: "Languages",
        cell: ({ row }) => {
            const langs = row.getValue<string[]>("languages")
            return langs.map(lang =>
                lang.charAt(0).toUpperCase() + lang.slice(1)
            ).join(", ")
        }
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue<ClassData["category"]>("category")
            return category.name_en
        }
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            return row.getValue<number>("published") === 1 ? <Badge variant={'success'}>{" Published"}</Badge> : <Badge variant={"destructive"}>{"Draft"}</Badge>
        }
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return new Date(row.getValue<string>("created_at")).toLocaleDateString()
        }
    }
]





export function CalassesTable({
    data,
    isLoading
}: {
    data: any[]
    isLoading: boolean
}) {


    return (
        <>
            <div className="rounded-md">
                <SharedTable<typeof data>
                    header={ClassTableHeader}
                    data={data}
                    columns={columns}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}
