'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, Phone, MapPin } from 'lucide-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { ScrollArea } from '@/components/ui/scroll-area';
// Form validation schema with Yup
const signupSchema = yup.object().shape({
    role: yup.string().required('Please select a role'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
    password_confirmation: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], "Passwords don't match"),
    languages: yup.array()
        .of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            })
        )
        .nullable()
        .when('role', {
            is: 'professor',
            then: (schema) => schema.min(1, 'Select at least one language')
        }),
    phone: yup.string().required('Phone number is required'),
    city: yup.string().required('City is required'),
    categories: yup.array()
        .of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            })
        )
        .nullable()
        .when('role', {
            is: 'professor',
            then: (schema) => schema.min(1, 'Select at least one category')
        }),
    description: yup.string()
        .when('role', {
            is: 'professor',
            then: (schema) =>
                schema.required('Description is required for professors')
                    .min(20, 'Description must be at least 20 characters')
        })
});

// TypeScript type for form data based on Yup schema
type FormData = yup.InferType<typeof signupSchema>;

// Custom styles for React Select
const selectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        minHeight: '36px',
        fontSize: '0.875rem',
        borderColor: state.isFocused ? '#8B5CF6' : '#E5E7EB',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none',
        '&:hover': {
            borderColor: '#8B5CF6'
        }
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: '0 8px',
    }),
    input: (provided: any) => ({
        ...provided,
        margin: '0',
        padding: '0',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        fontSize: '0.875rem',
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: '0.875rem',
        padding: '6px 12px',
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: '#EDE9FE',
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        fontSize: '0.75rem',
        padding: '2px 4px',
        color: '#5B21B6',
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        padding: '0 4px',
        color: '#5B21B6',
        '&:hover': {
            backgroundColor: '#DDD6FE',
            color: '#4C1D95',
        },
    }),
};

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isProfessor, setIsProfessor] = useState(false)

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            role: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            city: '',
            languages: [],
            categories: [],
            description: ''
        },
        mode: 'onTouched'
    });

    // Define select options
    const languageOptions = [
        'English', 'French', 'Spanish', 'German', 'Italian',
        'Chinese', 'Japanese', 'Arabic', 'Russian', 'Portuguese'
    ].map(lang => ({ label: lang, value: lang.toLowerCase() }));

    const categoryOptions = [
        { label: 'Mathematics', value: '1' },
        { label: 'Science', value: '2' },
        { label: 'Languages', value: '3' },
        { label: 'Arts', value: '4' },
        { label: 'Technology', value: '5' }
    ];

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
    };

    return (
        <div className="flex min-h-screen">
            {/* Form Section */}
            <div className="flex-1 bg-white">
                <ScrollArea className="h-screen">
                    <div className="flex items-center justify-center h-screen p-4 ">
                        <div className="w-full max-w-[500px] space-y-4 py-6">
                            <div className="space-y-1 text-center">
                                <h1 className="text-2xl font-bold text-purple-800">
                                    Create Your Account
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Join our community of professional educators
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-3">
                                    {/* Name & Email Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        className="w-full px-3 py-2 text-sm border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                        placeholder="Enter your full name"
                                                    />
                                                )}
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        className="w-full px-3 py-2 text-sm border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                        placeholder="Enter your email"
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Controller
                                                    name="password"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="w-full px-3 py-2 text-sm border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                            placeholder="Create password"
                                                        />
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute text-gray-400 right-2 top-2.5 hover:text-gray-600"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Controller
                                                    name="password_confirmation"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            className={`w-full px-3 py-2 text-sm border rounded-lg  ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200'
                                                                } focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all`}
                                                            placeholder="Confirm password"
                                                        />
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute text-gray-400 right-3 top-3 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <Eye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.password_confirmation.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="tel"
                                                            className="w-full py-2 pr-3 text-sm border rounded-lg pl-9 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                            placeholder="Enter phone number"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                City
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="w-full py-2 pr-3 text-sm border rounded-lg pl-9 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                            placeholder="Enter your city"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role Selection */}
                                    <div className="space-y-2">
                                        <div className="flex justify-center gap-4">
                                            <Controller
                                                name="role"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                value="professor"
                                                                checked={field.value === 'professor'}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value)
                                                                    setIsProfessor(true)
                                                                }}
                                                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                                            />
                                                            <span className="text-sm text-gray-700">Professor</span>
                                                        </label>
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                value="student"
                                                                checked={field.value === 'student'}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value)
                                                                    setIsProfessor(false)
                                                                }}
                                                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                                            />
                                                            <span className="text-sm text-gray-700">Student</span>
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>
                                        {errors.role && (
                                            <p className="text-xs text-red-500">{errors.role.message}</p>
                                        )}
                                    </div>

                                    {/* Professor-specific Fields */}
                                    {isProfessor && (
                                        <>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        Spoken Languages
                                                    </label>
                                                    <Controller
                                                        name="languages"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={languageOptions}
                                                                styles={selectStyles}
                                                                className="text-sm"
                                                                value={languageOptions.filter(option =>
                                                                    field.value?.some((val: any) => val.value === option.value)
                                                                )}
                                                                onChange={(selectedOptions) => {
                                                                    field.onChange(selectedOptions || []);
                                                                }}
                                                                placeholder="Select languages..."
                                                            />
                                                        )}
                                                    />
                                                    {errors.languages && (
                                                        <p className="text-xs text-red-500">{errors.languages.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        Teaching Categories
                                                    </label>
                                                    <Controller
                                                        name="categories"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={categoryOptions}
                                                                value={categoryOptions.filter(option =>
                                                                    field.value?.some((val: any) => val.value === option.value)
                                                                )}
                                                                onChange={(selectedOptions) => {
                                                                    field.onChange(selectedOptions || []);
                                                                }}
                                                                styles={selectStyles}
                                                                className="text-sm"
                                                                placeholder="Select categories..."
                                                            />
                                                        )}
                                                    />
                                                    {errors.categories && (
                                                        <p className="text-xs text-red-500">{errors.categories.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        Professional Description
                                                    </label>
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <textarea
                                                                {...field}
                                                                rows={3}
                                                                className="w-full px-3 py-2 text-sm border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                                placeholder="Tell us about your teaching experience..."
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isDirty || !isValid}
                                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-white transition-all bg-purple-700 rounded-lg hover:bg-purple-800"
                                >
                                    Create Account
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Image Section */}
            <div className="hidden w-1/2 bg-purple-100 lg:block">
                <img
                    src="/api/placeholder/1200/1600"
                    alt="Sign up"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default SignupForm;