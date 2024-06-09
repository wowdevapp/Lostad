'use client';
import english from '@/components/icons/languges/english.svg';
import france from '@/components/icons/languges/france.svg';
import germany from '@/components/icons/languges/germany.svg';
import nederlands from '@/components/icons/languges/nederlands.svg';
import spain from '@/components/icons/languges/spain.svg';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useState } from 'react';

interface Language {
    code: string;
    name: string;
    icon: string;
}



const languages = [
    { code: 'EN', name: 'English', icon: english },
    { code: 'FR', name: 'Français', icon: france },
    { code: 'NL', name: 'Nederlands', icon: nederlands },
    { code: 'DE', name: 'Deutsch', icon: germany },
    { code: 'ES', name: 'Español', icon: spain },
];
export function LanguageToggle() {
    const [slectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center w-10 h-10 gap-1 border-none outline-none focus:outline-none focus-visible:outline-none hover:bg-transparent">
                    <Avatar>
                        <Image
                            src={slectedLanguage.icon}
                            alt={slectedLanguage.name}
                            height={25}
                            width={25}
                        />
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup className='py-2'>
                    {
                        languages.map((language) => {

                            return (
                                <DropdownMenuItem
                                    onClick={() => { setSelectedLanguage(language) }}
                                    key={language.code}
                                    className="flex items-center">
                                    <Avatar>
                                        <Image
                                            src={language.icon}
                                            alt={language.name}
                                            height={25}
                                            width={25}
                                        />
                                    </Avatar>
                                    <span>{language.name} ({language.code})</span>
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
