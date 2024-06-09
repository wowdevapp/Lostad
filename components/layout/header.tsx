'use client';

import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { AlignJustify, Bell } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';




export default function Header() {

  const { toggle } = useSidebar();
  const handleToggle = () => {
    toggle();
  };
  return (
    <div className="relative top-0 left-0 right-0 z-20 border-b supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
      <nav className="flex items-center justify-between px-4 h-14">
        <div className="hidden cursor-pointer lg:block">
          <AlignJustify
            onClick={handleToggle}
            className='text-[#C4C4C4]'
          />
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <div className='flex items-center'>
            <ThemeToggle />
            <Bell className='text-[#B4B4B4] mr-6 ml-4' />
            <LanguageToggle />
          </div>
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
