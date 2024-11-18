/* eslint-disable no-console */
'use client'
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

type Props = {}

function Navbar({ }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = useTranslations('navbar');
    return (
        <nav className="sticky z-50 w-full bg-white shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">EduMeet</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="items-center justify-start hidden gap-6 md:flex">
                        <a className="text-gray-600 hover:text-blue-600" href="#find">
                            {t('findTutor')}
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#subjects">
                            {t('subject')}
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#how">
                            {t('how')}
                        </a>
                        <button className="py-2 text-gray-600 hover:text-blue-600">
                            {t('become')}
                        </button>
                        <Link href={"/login"} className="px-4 py-2 text-left text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            {t('signin')}
                        </Link>
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
                            {t('findTutor')}
                        </a>
                        <a className="block px-4 py-2 text-gray-600 hover:bg-blue-50" href="#subjects">
                            {t('subject')}
                        </a>
                        <a className="block px-4 py-2 text-gray-600 hover:bg-blue-50" href="#how">
                            {t('how')}
                        </a>
                        <button className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-blue-50">
                            {t('become')}
                        </button>
                        <Link href='/login' onClick={(e) => console.log(e)} className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-blue-50">
                            {t('signin')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar