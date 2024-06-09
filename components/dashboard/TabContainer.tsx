'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSidebar } from "@/hooks/useSidebar"
import { Expand, Search } from "lucide-react"
import { CalendarDateRangePicker } from "../date-range-picker"
import { ContractorsTable } from "../tables/contractors/ContractorsTable"
import { columns } from "../tables/contractors/columns"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
export type NumberOrNull = number | null
export type Worker = {
    id: string
    worker: string,
    protective_gloves: NumberOrNull,
    safety_glasses: NumberOrNull,
    ear_protection: NumberOrNull,
    mask_protection: NumberOrNull,
    knee_pads: NumberOrNull,
    safety_shoes: NumberOrNull,
    coverall: NumberOrNull,
    hi_viz_jacket: NumberOrNull,
    safety_harness: NumberOrNull,
    face_shield: NumberOrNull,
    hard_hat: NumberOrNull,
    welding_helmet: NumberOrNull,

}

const data: Worker[] = [
    {

        id: "1",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: null,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: null,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: null,
    },
    {

        id: "2",
        worker: "John Doe",
        protective_gloves: null,
        safety_glasses: 2,
        ear_protection: 11,
        mask_protection: null,
        knee_pads: null,
        safety_shoes: 10,
        coverall: 1,
        hi_viz_jacket: 2,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: null,
    },
    {

        id: "3",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: null,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: null,
        hi_viz_jacket: null,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: null,
    },
    {

        id: "4",
        worker: "John Doe",
        protective_gloves: null,
        safety_glasses: 2,
        ear_protection: null,
        mask_protection: null,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: 10,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 2,
    },
    {

        id: "5",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: 2,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: 10,
        safety_harness: 11,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 11,
    },
    {

        id: "6",
        worker: "John Doe",
        protective_gloves: null,
        safety_glasses: null,
        ear_protection: 2,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: null,
        hi_viz_jacket: 11,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 10,
    },
    {

        id: "7",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: 11,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: 2,
        coverall: 1,
        hi_viz_jacket: 10,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 2,
    },
    {

        id: "8",
        worker: "John Doe",
        protective_gloves: null,
        safety_glasses: null,
        ear_protection: null,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: null,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: null,
    },
    {

        id: "9",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: 2,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: 10,
        safety_harness: 11,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 11,
    },
    {

        id: "10",
        worker: "John Doe",
        protective_gloves: null,
        safety_glasses: null,
        ear_protection: 2,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: null,
        coverall: 1,
        hi_viz_jacket: 11,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 10,
    },
    {

        id: "11",
        worker: "John Doe",
        protective_gloves: 2,
        safety_glasses: null,
        ear_protection: 11,
        mask_protection: 10,
        knee_pads: null,
        safety_shoes: 2,
        coverall: 1,
        hi_viz_jacket: 10,
        safety_harness: null,
        face_shield: 3,
        hard_hat: null,
        welding_helmet: 2,
    },
]




export const TabContainer = () => {
    const { isMinimized } = useSidebar();
    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="px-2 border-r rounded-none" disabled value="">SITES</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="site1">Site 1</TabsTrigger>
                <TabsTrigger value="site2">Site 2</TabsTrigger>
                <TabsTrigger value="site3">Site 3</TabsTrigger>
                <TabsTrigger value="site4">Site 4</TabsTrigger>
            </TabsList>
            <TabsContent className={`p-4 ${!isMinimized ? 'w-[calc(100vw-18rem)]' : 'w-[calc(100vw-72px)]'}`} value="all">
                <div className="flex items-center justify-between">
                    <h3>P.P.E Violations Table</h3>
                    <div className="filter">
                        <div className="items-center hidden space-x-2 md:flex">
                            <CalendarDateRangePicker className="bg-white rounded-none" />
                            <div className="relative shadow-sm w-[260px]">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                        <Search size={16} />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="block w-full  border-0 py-1.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Search workers ..."
                                />
                            </div>
                            <Select >
                                <SelectTrigger placeholder="All Contractors" className="w-[180px] rounded-none border-0 ring-0 outline-none focus:outline-none focus-visible:outline-none bg-white">
                                    <SelectValue placeholder="All Contractors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Contractors</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" className="p-2 text-gray-300 bg-white rounded-none">
                                <Expand />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="pt-2 ">
                    <ContractorsTable data={data} columns={columns} />
                </div>
            </TabsContent>
        </Tabs>

    )
}
