'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const hours = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 8;
    return {
        id: hour.toString(),
        label: `${hour}:00 - ${hour + 1}:00`,
    };
});

const HourlySlotSelector = ({
    value = [],
    onChange = (slots: any) => { }
}) => {
    const days = [
        { id: 'mon', label: 'Monday' },
        { id: 'tue', label: 'Tuesday' },
        { id: 'wed', label: 'Wednesday' },
        { id: 'thu', label: 'Thursday' },
        { id: 'fri', label: 'Friday' },
        { id: 'sat', label: 'Saturday' },
        { id: 'sun', label: 'Sunday' },
    ];

    // Generate hours from 8:00 to 22:00


    const isSlotSelected = (day: string, hour: string) => {
        return value.some((v: any) => v.day === day && v.hour === hour);
    };

    const toggleSlot = (day: string, hour: string) => {
        const isSelected = isSlotSelected(day, hour);
        let newValue;

        if (isSelected) {
            newValue = value.filter((v: any) => !(v.day === day && v.hour === hour));
        } else {
            newValue = [...value, { day, hour }];
        }

        onChange(newValue);
    };

    return (
        <Card className="p-4">
            <div className="">
                {/* Header with hours */}
                <div className="grid grid-cols-[120px_repeat(17,40px)] gap-1 mb-2">
                    <div className="text-sm font-medium text-gray-500" />
                    {hours.map(hour => (
                        <div
                            key={hour.id}
                            className="text-xs font-medium text-center text-gray-500"
                        >
                            {hour.id}:00
                        </div>
                    ))}
                </div>

                {/* Days and time slots */}
                {days.map(day => (
                    <div
                        key={day.id}
                        className="grid grid-cols-[120px_repeat(17,40px)] gap-1 mb-1"
                    >
                        <div className="flex items-center text-sm font-medium text-gray-700">
                            {day.label}
                        </div>
                        {hours.map(hour => (
                            <Button
                                key={`${day.id}-${hour.id}`}
                                type="button"
                                variant="outline"
                                className={cn(
                                    "h-8 p-0",
                                    isSlotSelected(day.label, hour.id)
                                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                        : "hover:bg-gray-100"
                                )}
                                onClick={() => toggleSlot(day.label, hour.id)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default HourlySlotSelector;