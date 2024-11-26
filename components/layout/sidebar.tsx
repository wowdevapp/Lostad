'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import Logo2 from '@/public/logo.png';
import Logo from '@/public/logo.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized } = useSidebar();
  const t = useTranslations('sidebar');


  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r  md:block`, 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className='flex flex-col h-full'>
        <div className={cn('flex justify-center items-center py-2 border-b')}>
          {
            !isMinimized ? <Image width={40} height={45} className={`${isMinimized ? 'hidden h-0 w-0' : ''}`} src={Logo2} alt='logo' /> : <Image width={40} height={40} className={`${!isMinimized ? 'hidden h-0 w-0' : ''}`} src={Logo} alt='logo' />
          }
        </div>
        <div className="flex-1 py-4 space-y-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <DashboardNav items={navItems} />
            </div>
          </div>
        </div>
        <div className={`px-4 border-t  ${!isMinimized ? 'block transition-all duration-100' : 'hidden transition-all duration-100'} `}>
          <h3 className='py-2 text-sm'>{t('footer1')}</h3>
          <p className='text-[11px] pb-2'>
            {t('footer2')}
          </p>
        </div>
      </div>
    </nav>
  );
}
