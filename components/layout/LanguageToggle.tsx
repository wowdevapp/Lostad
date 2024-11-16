import english from '@/components/icons/languges/english.svg';
import france from '@/components/icons/languges/france.svg';
import ma from '@/components/icons/languges/ma2.svg';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useParams, usePathname } from 'next/navigation';

import setCookie from 'js-cookie';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing'; // Import useRouter from your i18n routing
import { useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

const languages = [
    { code: 'en', name: 'English', icon: english },
    { code: 'fr', name: 'Français', icon: france },
    { code: 'ar', name: 'العربية', icon: ma },
] as const;

const setLocaleCookie = (locale: string) => {
    // Set the locale cookie with appropriate options
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${30 * 24 * 60 * 60};samesite=lax${process.env.NODE_ENV === 'production' ? ';secure' : ''
        }`;

    // Set direction cookie for RTL support
    document.cookie = `NEXT_LOCALE_DIR=${locale === 'ar' ? 'rtl' : 'ltr'};path=/;max-age=${30 * 24 * 60 * 60
        };samesite=lax${process.env.NODE_ENV === 'production' ? ';secure' : ''}`;
};

export function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = useLocale();

    // Function to generate the new path for a given locale
    const getLocalizedPath = (newLocale: string) => {
        // Get all language codes for the regex pattern
        const languageCodes = languages.map(lang => lang.code).join('|');
        // Remove the current locale from the path if it exists
        const pathWithoutLocale = pathname.replace(new RegExp(`^/(${languageCodes})`), '');
        return `/${newLocale}${pathWithoutLocale || ''}`;
    };

    const handleLanguageChange = (newLocale: string) => {
        //delete old locale cookie
        setCookie.remove('NEXT_LOCALE');
        setLocaleCookie(newLocale);
        const newPath = getLocalizedPath(newLocale);
        router.push(newPath);
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative flex items-center w-10 h-10 gap-1 border-none outline-none focus:outline-none focus-visible:outline-none hover:bg-transparent"
                >
                    <Avatar>
                        <Image
                            src={languages.find((language) => language.code === currentLocale)?.icon}
                            alt={languages.find((language) => language.code === currentLocale)?.name || 'en'}
                            height={25}
                            width={25}
                        />
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup className='py-2'>
                    {languages.map((language) => (
                        <div
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`
                                flex items-center px-4 py-2 space-x-2 cursor-pointer
                                hover:bg-gray-100 dark:hover:bg-gray-800
                                ${currentLocale === language.code ? 'bg-gray-50 dark:bg-gray-800' : ''}
                            `}
                        >
                            <Avatar>
                                <Image
                                    src={language.icon}
                                    alt={language.name}
                                    height={25}
                                    width={25}
                                />
                            </Avatar>
                            <span className={`ml-2 ${currentLocale === language.code ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                {language.name} ({language.code})
                            </span>
                        </div>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}