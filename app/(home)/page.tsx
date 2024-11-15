// app/login/page.tsx
'use client';

import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative bg-white h-screen-nav">
            <div className="h-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between h-full gap-12 lg:flex-row">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Find Your Perfect</span>
                            <span className="block text-blue-600">Private Tutor</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
                            Connect with experienced tutors for personalized learning. Choose from thousands of teachers and improve your skills today.
                        </p>
                        <div className="mt-8">
                            <div className="relative max-w-xl">
                                <div className="flex items-center p-2 border-2 border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full py-2 pl-3 pr-10 text-gray-900 placeholder-gray-500 border-none focus:outline-none"
                                        placeholder="What would you like to learn?"
                                    />
                                    <button className="absolute px-4 py-2 text-white bg-blue-600 rounded-lg right-2 hover:bg-blue-700">
                                        Search
                                    </button>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-500">
                                Popular: Mathematics, Languages, Science, Music, Programming
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <Image
                            src="/img/hero01.jpg"
                            alt="Online tutoring"
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}