
// types/class.ts
'use client';
export interface ClassFormData {
    title: string | undefined;
    city: string;
    country: string;
    categories: string[];
    targetedAgeMin: number;
    targetedAgeMax: number;
    level: string;
    description: string;
    format: string[];
    availability: {
        day: string;
        hour: string;
    }[];
}

// components/ClassCreationForm.tsx
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import HourlySlotSelector from './TimeSlotShedular';


const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    city: z.string().min(2, 'Please enter a valid city'),
    country: z.string().min(2, 'Please enter a valid country'),
    categories: z.array(z.string()).min(1, 'Select at least one category'),
    targetedAgeMin: z.number().min(0).max(100),
    targetedAgeMax: z.number().min(0).max(100),
    level: z.string(),
    languages: z.array(z.string()).min(1, 'Select at least one language'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    format: z.string(),
    availability: z.array(z.object({
        day: z.string(),
        hour: z.string()
    })).min(1, 'Select at least one time slot'),
});

const categories = [
    'Art & Craft',
    'Music',
    'Dance',
    'Sports',
    'Languages',
    'Academics',
    'Technology',
    'Cooking',
];

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

// ... in the component ...
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


export function ClassCreationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            categories: [],
            availability: days.flatMap(day =>
                Array.from({ length: 17 }, (_, i) => ({
                    day,
                    hour: String(i + 8)
                }))
            ),
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            console.log('Form data:', data);
            // Add your API call here
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

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
                                    <FormMessage />
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
                                            options={[{ label: 'India', value: 'India' }, { label: 'USA', value: 'USA' }] as any}
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                            className="text-sm"
                                            placeholder={'Select country'}
                                        />
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Categories */}
                        <Controller
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <Select
                                        isMulti
                                        options={[
                                            { label: 'Music', value: 'music' },
                                            { label: 'Art', value: 'art' },
                                            { label: 'Dance', value: 'dance' },
                                            { label: 'Sports', value: 'sports' },
                                            { label: 'Academics', value: 'academics' }
                                        ]}
                                        value={field.value?.map((cat: string) => ({ label: cat, value: cat }))}
                                        onChange={(values) => field.onChange(values.map((v: any) => v.value))}
                                        className="text-sm"
                                        placeholder="Select categories"
                                    />
                                    <FormMessage />
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
                                        placeholder="Select categories"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Age Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                control={form.control}
                                name="targetedAgeMin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Minimum Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Minimum age"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="targetedAgeMax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Maximum age"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                        options={levelOptions}
                                        value={levelOptions.find(option => option.value === field.value)}
                                        onChange={(value) => field.onChange(value?.value)}
                                        placeholder="Select level"
                                        isClearable={false}
                                        className="react-select"
                                    />
                                    <FormMessage />
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
                                    <FormMessage />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Availability */}
                        <div className="space-y-4">
                            <Controller
                                control={form.control}
                                name="availability"
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
                                            Click on the slots to select your available hours
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Class
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}


export default ClassCreationForm;