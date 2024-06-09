'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, Settings, ShieldAlert } from 'lucide-react';
import { signOut } from 'next-auth/react';
export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center gap-2 border-none outline-none focus-visible:outline-none focus-visible:ring-0 hover:bg-transparent">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={''}
              alt={'BESIX Group'}
            />
            <AvatarFallback>{"alt"}</AvatarFallback>
          </Avatar>
          <span>BESIX Group</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="py-4 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {"BESIX Group"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              besix.group@besix.be
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='py-2'>
          <DropdownMenuItem>
            <Settings className='mr-2' />
            Profile settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShieldAlert className='mr-2' />
            Our policies
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
