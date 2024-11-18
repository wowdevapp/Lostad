'use client';

import { usePathname } from 'next/navigation';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Icons } from './icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface DashboardNavProps {
  items: NavbarItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

// Separate NavItem Component for better organization
const NavItem = ({
  item,
  path,
  isMinimized,
  isMobileNav,
  onNavClick
}: {
  item: NavbarItem['childs'][0];
  path: string;
  isMinimized: boolean;
  isMobileNav: boolean;
  onNavClick: () => void;
}) => {
  const Icon = Icons[item.icon || 'arrowRight'];
  if (!item.href) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.disabled ? '/' : item.href}
          className={cn(
            'flex my-1 items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            path === item.href ? 'bg-blue-600' : 'transparent',
            item.disabled && 'cursor-not-allowed opacity-80'
          )}
          onClick={onNavClick}
        >
          <Icon
            className={cn(
              'ml-3 size-5',
              path === item.href ? 'text-white' : 'text-[#C4C4C4]'
            )}
          />
          {(isMobileNav || (!isMinimized && !isMobileNav)) && (
            <span
              className={cn(
                "mr-2 truncate",
                path === item.href ? 'text-white' : 'text-[#C4C4C4]'
              )}
            >
              {item.title}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent
        align="center"
        side="right"
        sideOffset={8}
        className={cn(
          !isMinimized ? 'hidden' : 'inline-block',
          path === item.href ? 'text-white' : 'text-[#C4C4C4]'
        )}
      >
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
};

// Separate NavGroup Component
const NavGroup = ({
  group,
  isMinimized,
  children
}: {
  group: string;
  isMinimized: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="nav-group">
      {isMinimized ? (
        <hr />
      ) : (
        <div className="text-sm my-2 font-light text-[#C4C4C4] uppercase pl-3">
          {group}
        </div>
      )}
      <div className="pl-1">
        {children}
      </div>
    </div>
  );
};

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

  const handleNavClick = () => {
    if (setOpen) setOpen(false);
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((navGroup) => {
          // Create unique key for each group using group name or index
          const groupKey = `nav-group-${navGroup.group || 'default'}`;

          return (
            <NavGroup
              key={groupKey}
              group={navGroup.group}
              isMinimized={isMinimized}
            >
              {navGroup.childs.map((item, childIndex) => {
                // Create unique key for each nav item using href or index
                const itemKey = `nav-item-${item.href || childIndex}-${groupKey}`;

                return (
                  <NavItem
                    key={itemKey}
                    item={item}
                    path={path}
                    isMinimized={isMinimized}
                    isMobileNav={isMobileNav}
                    onNavClick={handleNavClick}
                  />
                );
              })}
            </NavGroup>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}

// Add type for NavbarItem if not already defined
interface NavbarItemChild {
  href?: string;
  title: string;
  icon?: keyof typeof Icons;
  disabled?: boolean;
}

interface NavbarItem {
  group: string;
  childs: NavbarItemChild[];
}