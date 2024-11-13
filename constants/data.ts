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
        title: 'My offers',
        href: '/dashboard/my-offers',
        icon: 'ShapesIcon',
        label: 'offers'
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
