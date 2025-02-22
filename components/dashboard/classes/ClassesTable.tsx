"use client"




import ClassTableHeader from "./classTableHeader"
import { SharedTable } from "@/components/SharedTable"
import { columns } from "./columns"







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
