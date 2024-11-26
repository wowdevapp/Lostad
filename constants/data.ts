import { NavbarItem } from '@/types';

export const navItems: NavbarItem[] = [
  {
    group: null,
    childs: [
      {
        title: 'dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        label: 'user'
      }
    ]
  },
  {
    group: null,
    childs: [
      {
        title: 'myclasses',
        href: '/dashboard/my-classes',
        icon: 'Presentation',
        label: 'Classes'
      },
      {
        title: 'profile',
        href: '/dashboard/profile',
        icon: 'UserRoundCog',
        label: 'Profile'
      },
      {
        title: 'settings',
        href: '/dashboard/settings',
        icon: 'Settings',
        label: 'Settings'
      }
    ]
  }
] as const;
