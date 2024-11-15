'use client'
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'

type Props = {}

function Navbar({ }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="sticky bg-white shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">EduMeet</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="items-center hidden space-x-8 md:flex">
                        <a className="text-gray-600 hover:text-blue-600" href="#find">Find Tutors</a>
                        <a className="text-gray-600 hover:text-blue-600" href="#subjects">Subjects</a>
                        <a className="text-gray-600 hover:text-blue-600" href="#how">How it Works</a>
                        <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
                            Become a Tutor
                        </button>
                        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <a className="block px-4 py-2 text-gray-600 hover:bg-blue-50" href="#find">
                            Find Tutors
                        </a>
                        <a className="block px-4 py-2 text-gray-600 hover:bg-blue-50" href="#subjects">
                            Subjects
                        </a>
                        <a className="block px-4 py-2 text-gray-600 hover:bg-blue-50" href="#how">
                            How it Works
                        </a>
                        <button className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-blue-50">
                            Become a Tutor
                        </button>
                        <button className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-blue-50">
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar