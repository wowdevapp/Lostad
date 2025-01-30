/* eslint-disable no-console */

// types/class.ts

'use client';

// components/ClassCreationForm.tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import HourlySlotSelector from './TimeSlotShedular';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { RootState } from '@/app/store/store';
import { Category, fetchCategories } from '@/app/store/features/categorySlice';
import { useEffect } from 'react';

import { createClass, resetSuccess, selectError, selectIsLoading, selectSuccess } from '@/app/store/features/classSlice';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';




const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    city: z.string().min(2, 'Please enter a valid city'),
    country: z.string().min(1, "Please select a country"),
    category_id: z.string().min(1, 'Select at least one category'),
    currency: z.string().min(1, 'Select a currency'),
    price: z.number().min(1, 'Price must be greater than 0'),
    min_age: z.number().min(4).max(100),
    max_age: z.number().min(4).max(100),
    level: z.array(z.string()).min(1, 'Select at least one level'),
    languages: z.array(z.string()).min(1, 'Select at least one language'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    format: z.string(),
    availabilities: z.array(z.object({
        day: z.string(),
        hour: z.string()
    })).min(1, 'Select at least one time slot'),
}).refine(
    (data) => data.max_age > data.min_age,
    {
        message: "Maximum age must be greater than minimum age",
        path: ["max_age"]
    }
);

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

type Option = { label: string; value: string };

const levelOptions: Option[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' }
];

const formatOptions: Option[] = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Hybrid', value: 'hybrid' }
];

const currencyOptions: Option[] =
    [
        {
            label: 'Dirham',
            value: 'dh'
        },
        {
            label: 'Dollar',
            value: 'usd'
        },
        {
            label: 'Euro',
            value: 'eur'
        }
    ]


export function ClassCreationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            category_id: '',
            city: '',
            country: '',
            min_age: undefined,
            max_age: undefined,
            availabilities: days.flatMap(day =>
                Array.from({ length: 17 }, (_, i) => ({
                    day,
                    hour: String(i + 8)
                }))
            ),
        },
    });

    const router = useRouter();
    const dispatch = useAppDispatch();

    // Add these selectors
    const isLoading = useAppSelector(selectIsLoading);
    const success = useAppSelector(selectSuccess);
    const error = useAppSelector(selectError);

    const { categories } = useAppSelector((state: RootState) => state.category);

    const categoryOptions = categories.map((category: Category) => ({
        label: category.name,
        value: category.id ? String(category.id) : ''
    }));

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log('Form data:', data);
        try {
            dispatch(createClass(data));
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Handle success and error states
    useEffect(() => {
        if (success) {
            toast.success('Class created succefully', {
                position: 'top-right',
                autoClose: 3000
            });
            dispatch(resetSuccess());
            router.push('/dashboard/my-classes'); // Navigate to home page
        }
        if (error) {
            toast.error(error || 'Couldn\'t create your class', { autoClose: 3000, position: 'bottom-right' });
        }
    }, [success, error, router, dispatch]);

    return (
        <Card className="w-full py-4 mx-auto my-2">
            <CardHeader>
                <CardTitle>Create New Class</CardTitle>
                <CardDescription>
                    Fill in the details to create a new class listing
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information */}
                        <Controller
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter class title" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.title?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select
                                            {...field}
                                            options={[
                                                {
                                                    label: 'Morroco',
                                                    value: 'morroco'
                                                }
                                            ] as any}
                                            onChange={(option) => field.onChange(option?.value)}
                                            value={{
                                                label: 'Morroco',
                                                value: 'morroco'
                                            }}
                                            className="text-sm"
                                            placeholder={'Select country'}
                                        />
                                        <FormMessage>
                                            {form.formState.errors.country?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter city" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.city?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Category */}
                        <Controller
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        options={categoryOptions}
                                        value={categoryOptions.find(option => option.value == field.value)}
                                        onChange={(value) => { field.onChange(value?.value) }}
                                        className="text-sm"
                                        placeholder="Select Category"
                                    />
                                    <FormMessage>
                                        {form.formState.errors.category_id?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {/* The class is taught in */}
                        <Controller
                            control={form.control}
                            name="languages"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>The class is taught in</FormLabel>
                                    <Select
                                        isMulti
                                        options={[
                                            { label: 'Arabic', value: 'arabic' },
                                            { label: 'English', value: 'english' },
                                            { label: 'French', value: 'french' },
                                            { label: 'Spanish', value: 'spanish' },
                                            { label: 'German', value: 'german' },
                                        ]}
                                        value={field.value?.map((cat: string) => ({ label: cat, value: cat }))}
                                        onChange={(values) => field.onChange(values.map((v: any) => v.value))}
                                        className="text-sm"
                                        placeholder="Select Category"
                                    />
                                    <FormMessage>
                                        {form.formState.errors.languages?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Age Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                control={form.control}
                                name="min_age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Minimum Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Minimum age"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.min_age?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="max_age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Maximum age"
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.max_age?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Level */}
                        <Controller
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class Level</FormLabel>
                                    <Select
                                        {...field}
                                        isMulti
                                        options={levelOptions}
                                        value={levelOptions.filter(option => field.value?.includes(option.value))}
                                        onChange={(values) => field.onChange(values.map((v: any) => v.value))}
                                        placeholder="Select level"
                                        isClearable={false}
                                        className="react-select"
                                    />
                                    <FormMessage>
                                        {form.formState.errors.level?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <Controller
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your class..."
                                            className="h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.description?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Format */}
                        <Controller
                            control={form.control}
                            name="format"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class Format</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            options={formatOptions}
                                            value={formatOptions.find(option => option.value === field.value)}
                                            onChange={(value) => field.onChange(value?.value)}
                                            placeholder="Select format"
                                            isClearable={false}
                                            className="react-select"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.format?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Availability */}
                        <div className="space-y-4">
                            <Controller
                                control={form.control}
                                name="availabilities"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Select your available time slots</FormLabel>
                                        <FormControl>
                                            <HourlySlotSelector
                                                value={field.value as any}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Click on the slots to remove unavailable hours
                                        </FormDescription>
                                        <FormMessage>
                                            {form.formState.errors.availabilities?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Price */}

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <Select
                                            {...field}
                                            options={currencyOptions}
                                            onChange={(option) => field.onChange(option?.value)}
                                            value={currencyOptions.find(option => option.value === field.value)}
                                            className="text-sm"
                                            placeholder={'Select currency'}
                                        />
                                        <FormMessage>
                                            {form.formState.errors.currency?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price per (60 min)</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                placeholder="Enter price"
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.price?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <Button type="submit" className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Create Class"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}


export default ClassCreationForm;