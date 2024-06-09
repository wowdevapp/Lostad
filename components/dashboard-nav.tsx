'use client';

import { usePathname } from 'next/navigation';

import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { NavbarItem } from '@/types';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Icons } from './icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface DashboardNavProps {
  items: NavbarItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  console.log('isActive', isMobileNav, isMinimized);

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        <>
          {
            items.map((item, index) => {
              return (
                <>
                  {
                    item.group && !isMinimized && (
                      <div key={index} className="text-sm  font-light text-[#C4C4C4] uppercase pl-3">
                        {item.group}
                      </div>
                    )
                  }
                  {
                    isMinimized && item.group && (
                      <hr />
                    )
                  }
                  <div className='pl-1'>
                    {item.childs.map((item, index) => {
                      const Icon = Icons[item.icon || 'arrowRight'];
                      return (
                        item.href && (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Link
                                href={item.disabled ? '/' : item.href}
                                className={cn(
                                  'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                  path === item.href ? 'bg-[#42A4DF]' : 'transparent',
                                  item.disabled && 'cursor-not-allowed opacity-80'
                                )}
                                onClick={() => {
                                  if (setOpen) setOpen(false);
                                }}
                              >
                                <Icon className={`ml-3 size-5 ${path === item.href ? 'text-white' : 'text-[#C4C4C4]'} `} />

                                {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                  <span className={cn("mr-2 truncate", path === item.href ? 'text-white' : 'text-[#C4C4C4]')}>{item.title}</span>
                                ) : (
                                  ''
                                )}
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              align="center"
                              side="right"
                              sideOffset={8}
                              className={cn(!isMinimized ? 'hidden' : 'inline-block', path === item.href ? 'text-white' : 'text-[#C4C4C4]')}
                            >
                              {item.title}
                            </TooltipContent>
                          </Tooltip>
                        )
                      );
                    })}
                  </div>

                </>
              )
            })
          }
        </>
      </TooltipProvider>
    </nav>
  );
}
