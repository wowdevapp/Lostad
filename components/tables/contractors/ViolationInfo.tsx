import { PopoverContent } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import Image from "next/image";
import firstImage from './icons/1.png';
import secondImage from './icons/2.png';
function ViolationInfo() {
    return (
        <PopoverContent align="start" className="p-0">
            <ScrollArea>
                <div className="flex flex-col space-y-2 max-h-[calc(80vh-120px)] p-2">
                    <div className="flex flex-col justify-center w-full pb-2 space-y-2 border-b">
                        <Image className="mx-auto" src={firstImage} alt="first" />
                        <div className="flex items-end justify-between">
                            <div className="flex items-end text-sm">
                                <span>
                                    Comment
                                </span>
                            </div>
                            <div className="flex items-end text-xs">
                                {/* resize icon */}
                                <Clock className="mr-1 text-[#F88923]" width={16} height={16} />
                                <span>
                                    15/11/2022  10:34
                                </span>
                                <span className="ml-2 text-sm font-semibold">#03</span>
                            </div>
                        </div>
                        <div className="rounded-md bg-[#F8F8F8] mb-2">
                            <p className="text-[11px] p-3">
                                consectetur adipiscing elit, do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua
                                adipiscingdo eiusmod tempor incididunt labore
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full space-y-2 border-b">
                        <Image className="mx-auto" src={secondImage} alt="second" />
                        <div className="flex items-end justify-between">
                            <div className="flex items-end text-sm">
                                <span>
                                    Comment
                                </span>
                            </div>
                            <div className="flex items-end text-xs">
                                {/* resize icon */}
                                <Clock className="mr-1 text-[#F88923]" width={16} height={16} />
                                <span>
                                    15/11/2022  10:34
                                </span>
                                <span className="ml-2 text-sm font-semibold">#07</span>
                            </div>
                        </div>
                        <div className="rounded-md bg-[#F8F8F8]">
                            <p className="text-[11px] p-3">
                                consectetur adipiscing elit, do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua
                                adipiscingdo eiusmod tempor incididunt labore
                            </p>
                        </div>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </PopoverContent>
    )
}

export default ViolationInfo