import { Badge } from '@/components/ui/badge';
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "./types";
import { ClassData } from '@/lib/class/types';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original

            return (
                <div className="flex items-center justify-end px-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => { }}
                                className="text-blue-600 cursor-pointer focus:text-blue-600"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => { }}
                                className="text-red-600 cursor-pointer focus:text-red-600"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]