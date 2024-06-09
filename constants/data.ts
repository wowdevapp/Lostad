import { NavbarItem } from '@/types';

export const navItems: NavbarItem[] = [
  {
    group: null,
    childs: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        label: 'user'
      },
      {
        title: 'P.P.E violations',
        href: '/',
        icon: 'mainiCon',
        label: 'ppe'
      }
    ]
  },
  {
    group: 'MANAGE',
    childs: [
      {
        title: 'P.P.Es',
        href: '/ppes',
        icon: 'hands',
        label: 'PPES'
      },
      {
        title: 'Contractors',
        href: '/dashboard/user',
        icon: 'contractor',
        label: 'contractors'
      }
    ]
  }
];
