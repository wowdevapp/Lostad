'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function CalendarDateRangePicker({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20)
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal rounded-none',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className='flex flex-col p-4 space-y-2'>
            <div>Date range</div>
            <div className="flex items-center justify-between">
              <span className='border'>
                <Select>
                  <SelectTrigger placeholder="Custom" className="w-[140px] font-semibold rounded-none border-0 ring-0 outline-none focus:outline-none focus-visible:outline-none bg-white">
                    <SelectValue className='font-semibold' placeholder="Costum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">2 month</SelectItem>
                    <SelectItem value="dark">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </span>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />

          <div className='flex justify-end px-2 py-2'>
            <Button
              variant="ghost"
              className="text-center text-gray-500 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              className="bg-[#37C34D] text-white text-center"
            >
              Apply
            </Button>

          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
