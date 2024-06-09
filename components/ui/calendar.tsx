'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 ', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#42A4DF]',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-2xl [&:has(>.day-range-start)]:rounded-l-2xl first:[&:has([aria-selected])]:rounded-none last:[&:has([aria-selected])]:rounded-none'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start ',
        day_range_end: 'day-range-end rounded',
        day_selected:
          'bg-[#42A4DF] text-primary-foreground hover:bg-[#42A4DF] hover:text-primary-foreground focus:bg-[#42A4DF] focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-[#42A4DF] text-white aria-selected:text-white',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="w-4 h-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="w-4 h-4" />
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
