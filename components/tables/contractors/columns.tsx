"use client"

import {
    ColumnDef
} from "@tanstack/react-table";
import { Settings } from "lucide-react";
import avatar from './icons/avatar.svg';
import bio from './icons/bio.svg';
import coverall from './icons/coverall.svg';
import ear from './icons/ear.svg';
import glasses from './icons/glasses.svg';
import gloves from './icons/gloves.svg';
import harness from './icons/harness.svg';
import hat from './icons/hat.svg';
import helmet from './icons/helmet.svg';
import jacket from './icons/jacket.svg';
import knee from './icons/knee.svg';
import mask from './icons/mask.svg';
import shield from './icons/shield.svg';
import shoes from './icons/shoes.svg';


import { NumberOrNull } from "@/components/dashboard/TabContainer";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import ViolationInfo from "./ViolationInfo";


export const columns: ColumnDef<Worker>[] = [
    {
        accessorKey: "id",
        size: 10,
        maxSize: 10,
        enableHiding: false,
        header: ({ column, table }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 ml-auto">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        cell: ({ row }) => <div className="text-center lowercase">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "worker",
        header: "Worker",
        enableHiding: false,
        size: 240,
        maxSize: 240,
        minSize: 240,
        cell: ({ row }) => (
            <div className="capitalize w-[240px] flex justify-between items-center">
                <div className="mr-2 avatar">
                    <Avatar className="w-10 h-10">
                        <Image
                            src={avatar}
                            alt={'Blaise DEFLOO'}
                        />
                    </Avatar>
                </div>
                <div className="flex flex-col flex-1">
                    <span>
                        Blaise DEFLOO
                    </span>
                    <span>
                        Manager
                    </span>
                </div>
                <div>
                    <Image
                        src={bio}
                        alt={"bio"}
                    />
                </div>
            </div>
        ),
    },
    {
        accessorKey: "protective_gloves",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={gloves} alt="gloves" width={90} height={900} />
                    <span> Protective Gloves</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("protective_gloves")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "safety_glasses",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={glasses} alt="glasses" width={90} height={90} />
                    <span> Safety glasses</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("safety_glasses")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }


    },
    {
        accessorKey: "ear_protection",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={ear} alt="glasses" width={90} height={90} />
                    <span> ear protection</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("ear_protection")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "mask_protection",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={mask} alt="glasses" width={90} height={90} />
                    <span>Mask protection</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("mask_protection")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "knee_pads",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={knee} alt="glasses" width={90} height={90} />
                    <span>Knee pads</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("knee_pads")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        },
    },
    {
        accessorKey: "safety_shoes",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={shoes} alt="shoes" width={90} height={90} />
                    <span>Safety shoes</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("safety_shoes")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "coverall",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={coverall} alt="shoes" width={90} height={90} />
                    <span>ِoverall</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("coverall")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "hi_viz_jacket",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={jacket} alt="shoes" width={90} height={90} />
                    <span>Hi viz jacket</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("hi_viz_jacket")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "safety_harness",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={harness} alt="harness" width={90} height={90} />
                    <span>Safety harness</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("safety_harness")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "face_shield",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={shield} alt="shoes" width={90} height={90} />
                    <span>Safety shoes</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("face_shield")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "hard_hat",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={hat} alt="shoes" width={90} height={90} />
                    <span>Hard hat</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("hard_hat")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
    {
        accessorKey: "welding_helmet",
        header: ({ column }) => {
            return (
                <div className="w-full text-center">
                    <Image className="mx-auto" src={helmet} alt="shoes" width={90} height={90} />
                    <span>Welding helmet</span>
                </div>
            )
        },
        cell: ({ row }) => {
            const value: NumberOrNull = row.getValue("welding_helmet")
            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="lowercase w-[100px] mx-auto text-center">
                            {
                                value === null ? "-" : (
                                    <>
                                        {
                                            value > 5 ? (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-white bg-[#EF3C3C] rounded-full">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-8 h-8 mx-auto text-center text-black rounded-full bg-amber-300">
                                                    <span>
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </PopoverTrigger>
                    <ViolationInfo />
                </Popover >
            )
        }
    },
]